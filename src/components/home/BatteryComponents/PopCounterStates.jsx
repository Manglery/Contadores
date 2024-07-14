import React, { useState } from "react";
import "../homeStyle/PopContador.css";
import { useForm } from "react-hook-form";

const PopCounterStates = ({
  scanerResult,
  setAddCounter,
  setArrayCounters,
  setScanerResult,
}) => {
  const { register, handleSubmit, watch } = useForm();
  const [error, setError] = useState(false);

  const saveState = (data) => {
    if (!data.option) {
      setError(true);
      return;
    }

    setError(false);

    if (data.option === "soloContador") {
      setArrayCounters((prev) => [
        ...prev,
        { counter_state: "Solo Contador", counter_code: scanerResult },
      ]);
    }
    if (data.option === "parcial") {
      setArrayCounters((prev) => [
        ...prev,
        { counter_state: "Parcial", counter_code: scanerResult },
      ]);
    }
    if (data.option === "completo") {
      setArrayCounters((prev) => [
        ...prev,
        { counter_state: "Completo", counter_code: scanerResult },
      ]);
    }

    setAddCounter(false);
    setScanerResult(null);
  };

  return (
    <div className="PopContador_container">
      <section style={{ height: "auto" }}>
        <h3>Contador: {scanerResult}</h3>
        <form onSubmit={handleSubmit(saveState)}>
          <div className="RegisterOtForm_checkBoxsContainer_div">
            <div>
              <label htmlFor="soloContador">Solo Contador*</label>
              <input
                {...register("option")}
                type="radio"
                id="soloContador"
                value="soloContador"
              />
            </div>
            <div>
              <label htmlFor="parcial">Parcial*</label>
              <input
                {...register("option")}
                type="radio"
                id="parcial"
                value="parcial"
              />
            </div>
            <div>
              <label htmlFor="completo">Completo*</label>
              <input
                {...register("option")}
                type="radio"
                id="completo"
                value="completo"
              />
            </div>
          </div>
          {error && <span> Debe seleccionar al menos una opción.</span>}
          <div className="PopContador_buttons">
            <button
              type="button"
              className="PopContador_container_buttom"
              onClick={() => setAddCounter(false)}
            >
              CANCELAR
            </button>
            <button type="submit" className="PopContador_container_buttom">
              GUARDAR
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default PopCounterStates;

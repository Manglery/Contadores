import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import config from "../../../utils/getToken";
import "../homeStyle/RegisterOt.css";
import { toast } from "react-toastify";
import PopContador from "../BatteryComponents/PopContador";
import PopCounterStates from "./PopCounterStates";
import Loading from "../../../hooks/Loading";

const RegisterBattery = ({
  resetSearch,
  setViewRegister,
  search,
  setsearch,
  userData,
}) => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scanerResult, setScanerResult] = useState(null);
  const [arrayCounters, setArrayCounters] = useState([]);
  const [addCounter, setAddCounter] = useState(false);

  const [loading, setLoading] = useState(false);

  const submit = (data) => {
    setLoading(true);
    const url = `${import.meta.env.VITE_URL_API}/batteries/${userData.id}`;
    axios
      .post(url, { ...data, arratTypeCounter: arrayCounters }, config)
      .then((res) => {
        toast.success("La bateria se creo exitosamente");
        setsearch("");
        reset();
        setViewRegister(false);
        setLoading(false);
        resetSearch();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(
          "Hubo un error al crear la bateria,  verifique bien los datos"
        );
      });
  };

  return (
    <section className="RegisterOt_container">
      {loading && <Loading />}

      <h1>Registrar Batería</h1>
      {scannerOpen && (
        <PopContador
          setScanerResult={setScanerResult}
          setScannerOpen={setScannerOpen}
        />
      )}

      <form
        onSubmit={handleSubmit(submit)}
        className="RegisterOt_formContainer"
      >
        <div className="RegisterOt_formContainer_div">
          <label htmlFor="ot_mano">Nº de Batería *</label>
          <input
            {...register("ot_mano")}
            id="ot_mano"
            type="text"
            required
            defaultValue={search}
            placeholder="Ingrese el Nº de  batería"
          />
        </div>
        <div className="RegisterOt_formContainer_div">
          <label htmlFor="counter">Contador *</label>
          <input
            {...register("counter")}
            id="counter"
            type="text"
            placeholder="Ingrese el Contador"
            value={scanerResult ? scanerResult : ""}
            onChange={(e) => setScanerResult(e.target.value)}
          />
          <i onClick={() => setScannerOpen(true)} className="bx bxs-camera"></i>
        </div>

        <div className="RegisterOt_form_counterStatus">
          {scanerResult && (
            <button type="button" onClick={() => setAddCounter(true)}>
              Agregar contador
            </button>
          )}

          <ul>
            {arrayCounters?.map((counterState, index) => (
              <li key={index}>
                {counterState.counter_code} - {counterState.counter_state}
              </li>
            ))}
          </ul>
        </div>

        <div className="RegisterOt_formContainer_div">
          <label htmlFor="materials">Materiales *</label>
          <input
            {...register("materials")}
            id="materials"
            type="text"
            required
            placeholder="Ingrese los Materiales"
          />
        </div>
        <div className="RegisterOt_formContainer_div">
          <label htmlFor="observations">Observaciones *</label>
          <input
            {...register("observations")}
            id="observations"
            type="text"
            required
            placeholder="Ingrese las observaciones"
          />
        </div>
        <section className="crudPopForm__sectionButtons">
          <button type="button" onClick={() => setViewRegister(false)}>
            CANCELAR
          </button>{" "}
          <button type="submit">REGISTRAR</button>
        </section>
      </form>
      {addCounter && (
        <PopCounterStates
          setArrayCounters={setArrayCounters}
          scanerResult={scanerResult}
          setAddCounter={setAddCounter}
          setScanerResult={setScanerResult}
        />
      )}
    </section>
  );
};

export default RegisterBattery;

import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import config from "../../../utils/getToken";
import "../homeStyle/RegisterOt.css";
import { toast } from "react-toastify";
import PopContador from "./PopContador";
import PopClac from "./PopClac";
import Loading from "../../../hooks/Loading";

const RegisterOt = ({
  resetSearch,
  setsearch,
  setViewRegister,
  search,
  userData,
}) => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [loading, setLoading] = useState(false);

  const submit = (data) => {
    setLoading(data);
    const url = `${import.meta.env.VITE_URL_API}/ots/${userData.id}`;
    axios
      .post(
        url,
        { ...data, counter: scanerResult, clac: scanerResultClac },
        config
      )
      .then((res) => {
        toast.success("El OT se registro exitosamente");
        reset();
        setsearch("");
        resetSearch();
        setViewRegister(false);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Hubo un error al crear al OT,  verifique bien los datos");
      });
  };

  const [scannerOpen, setScannerOpen] = useState(false);
  const [scanerResult, setScanerResult] = useState(null);
  const [scannerOpenClac, setScannerOpenClac] = useState(false);
  const [scanerResultClac, setScanResultClac] = useState(null);

  return (
    <section className="RegisterOt_container">
      {loading && <Loading />}
      <h1>Registrar Ot</h1>
      {scannerOpen && (
        <PopContador
          setScanerResult={setScanerResult}
          setScannerOpen={setScannerOpen}
        />
      )}
      {scannerOpenClac && (
        <PopClac
          setScanResultClac={setScanResultClac}
          setScannerOpenClac={setScannerOpenClac}
        />
      )}

      <form
        onSubmit={handleSubmit(submit)}
        className="RegisterOt_formContainer"
      >
        <div className="RegisterOt_formContainer_div">
          <label htmlFor="ot_mano">OT-Mano *</label>
          <input
            {...register("ot_mano")}
            id="ot_mano"
            type="text"
            required
            defaultValue={search}
            placeholder="Ingrese OT-Mano"
          />
        </div>
        <div className="RegisterOt_formContainer_div">
          <label htmlFor="counter">Contador *</label>
          <input
            id="counter"
            type="text"
            required
            placeholder="Ingrese el Contador"
            value={scanerResult}
            onChange={(e) => setScanerResult(e.target.value)}
          />
          <i onClick={() => setScannerOpen(true)} className="bx bxs-camera"></i>
        </div>
        <div className="RegisterOt_formContainer_div">
          <label htmlFor="clac">Clac *</label>
          <input
            id="clac"
            type="text"
            required
            placeholder="Ingrese el clac"
            value={scanerResultClac}
            onChange={(e) => setScanResultClac(e.target.value)}
          />
          <i
            onClick={() => setScannerOpenClac(true)}
            className="bx bxs-camera"
          ></i>
        </div>
        <div className="RegisterOtForm_checkBoxsContainer">
          <h2>Tipo de Actuación</h2>
          <div className="RegisterOtForm_checkBoxsContainer_div">
            <div>
              <label htmlFor="soloContador">Solo Contador*</label>
              <input
                {...register("soloContador")}
                type="checkbox"
                name="soloContador"
                id="soloContador"
              />
            </div>
            <div>
              <label htmlFor="parcial">Parcial*</label>
              <input
                {...register("parcial")}
                type="checkbox"
                name="parcial"
                id="parcial"
              />
            </div>
            <div>
              <label htmlFor="completo">Completo*</label>
              <input
                {...register("completo")}
                type="checkbox"
                name="completo"
                id="completo"
              />
            </div>
            <div>
              <label htmlFor="instPEConexInterior">
                Inst. PE Conex. Interior*
              </label>
              <input
                {...register("instPEConexInterior")}
                type="checkbox"
                name="instPEConexInterior"
                id="instPEConexInterior"
              />
            </div>
            <div>
              <label htmlFor="bateria">Batería*</label>
              <input
                {...register("bateria")}
                type="checkbox"
                name="bateria"
                id="bateria"
              />
            </div>
            <div>
              <label htmlFor="incidencia">Incidencía*</label>
              <input
                {...register("incidencia")}
                type="checkbox"
                name="incidencia"
                id="incidencia"
              />
            </div>
            <div>
              <label htmlFor="instClac">Inst. Clac*</label>
              <input
                {...register("instClac")}
                type="checkbox"
                name="instClac"
                id="instClac"
              />
            </div>
            <div>
              <label htmlFor="otros">Otros*</label>
              <input
                {...register("otros")}
                type="checkbox"
                name="otros"
                id="otros"
              />
            </div>
          </div>
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
    </section>
  );
};

export default RegisterOt;

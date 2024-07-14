import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../utils/getToken";
import { toast } from "react-toastify";
import "./homeStyle/battery.css";
import RegisterBattery from "./BatteryComponents/RegisterBattery";
import { useForm } from "react-hook-form";

const Battery = ({ userData }) => {
  const { register, handleSubmit, reset, watch } = useForm();

  const [search, setsearch] = useState("");
  const [dataBattery, setDataBattery] = useState();
  const [viewRegister, setViewRegister] = useState(false);

  useEffect(() => {
    if (search !== "") {
      const url = `${import.meta.env.VITE_URL_API}/batteries/${search}/user/${
        userData.id
      }`;

      axios
        .get(url, config)
        .then((res) => {
          setDataBattery(res.data.battery);
          setViewRegister(false);
          toast.success("La bateria se encontro en la base de datos");
        })
        .catch((err) => {
          setDataBattery();
          setViewRegister(true);
          toast.error("La bateria no se encuentra registrado");
        });
    }
  }, [search]);

  const searchSubmit = (data) => {
    setsearch(data.battery);
  };

  function resetSearch() {
    reset();
  }

  return (
    <div className="battery_container">
      <form
        onSubmit={handleSubmit(searchSubmit)}
        className="battery_formContainer"
      >
        <label htmlFor="battery">Nº de Batería</label>
        <div className="batteryForm_div">
          <input
            {...register("battery")}
            type="text"
            id="battery"
            placeholder="Ingrese el Nº de la batería"
          />

          <button type="submit">
            <i className="bx bx-search-alt"></i>
          </button>
        </div>
      </form>

      {dataBattery && (
        <section className="battery_sectionOne">
          <h1>Datos de la Batería</h1>
          <div className="battery_sectionOne_div">
            <h2>Nº de Batería:</h2>
            <p>{dataBattery.ot_mano}</p>
          </div>
          <div className="battery_sectionOne_div">
            <h2>Contador:</h2>
            <ul>
              {dataBattery?.typesCounters.map((counter) => (
                <li key={counter.id}>
                  {counter.counter_code} - {counter.counter_state}
                </li>
              ))}
            </ul>
          </div>

          <div className="battery_sectionOne_div">
            <h2>Materiales:</h2>
            <p>{dataBattery.materials}</p>
          </div>
          <div className="battery_sectionOne_div">
            <h2>Observaciones:</h2>
            <p>{dataBattery.observations}</p>
          </div>
        </section>
      )}
      {viewRegister && (
        <RegisterBattery
          setsearch={setsearch}
          setViewRegister={setViewRegister}
          search={search}
          userData={userData}
          resetSearch={resetSearch}
        />
      )}
    </div>
  );
};

export default Battery;

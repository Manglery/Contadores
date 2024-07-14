import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../utils/getToken";
import { toast } from "react-toastify";
import RegisterOt from "./OtComponents/RegisterOt";
import "./homeStyle/ots.css";
import { useForm } from "react-hook-form";

const Ots = ({ userData }) => {
  const { register, handleSubmit, reset, watch } = useForm();

  const [search, setsearch] = useState("");
  const [dataOt, setDataOt] = useState();
  const [viewRegister, setViewRegister] = useState(false);

  useEffect(() => {
    if (search !== "") {
      const url = `${import.meta.env.VITE_URL_API}/ots/${search}/user/${
        userData.id
      }`;

      axios
        .get(url, config)
        .then((res) => {
          setDataOt(res.data.ot);

          setViewRegister(false);
          toast.success("El OT se encontro en la base de datos");
        })
        .catch((err) => {
          setDataOt();
          setViewRegister(true);
          toast.error("El OT no se encuentra registrado");
        });
    }
  }, [search]);

  const searchSubmit = (data) => {
    setsearch(data.ot);
  };

  function resetSearch() {
    reset();
  }

  return (
    <div className="ot_container">
      <form onSubmit={handleSubmit(searchSubmit)} className="ot_formContainer">
        <label htmlFor="ot">OT</label>
        <div className="otForm_div">
          <input {...register("ot")} type="text" placeholder="ingrese el ot" />

          <button type="submit">
            <i className="bx bx-search-alt"></i>
          </button>
        </div>
      </form>

      {dataOt && (
        <section className="ot_sectionOne">
          <h1>Datos del OT </h1>
          <div className="ot_sectionOne_div">
            <h2>OT-Mano :</h2>
            <p>{dataOt.ot_mano}</p>
          </div>
          <div className="ot_sectionOne_div">
            <h2>Contador :</h2>
            <p>{dataOt.counter}</p>
          </div>
          <div className="ot_sectionOne_div">
            <h2>Clac :</h2>
            <p>{dataOt.clac}</p>
          </div>
          <div className="ot_sectionOne_div">
            <h2>Tipo de Actuación :</h2>
            {dataOt?.typesOfActions.map((typeOfActions) => (
              <ul key={typeOfActions.id}>
                <li>
                  Solo Contador{" "}
                  <span
                    style={
                      typeOfActions.soloContador
                        ? { backgroundColor: "blueviolet" }
                        : {}
                    }
                  ></span>
                </li>
                <li>
                  Parcial{" "}
                  <span
                    style={
                      typeOfActions.parcial
                        ? { backgroundColor: "blueviolet" }
                        : {}
                    }
                  ></span>
                </li>
                <li>
                  Completo{" "}
                  <span
                    style={
                      typeOfActions.completo
                        ? { backgroundColor: "blueviolet" }
                        : {}
                    }
                  ></span>
                </li>
                <li>
                  Inst. PE Conex. Interior{" "}
                  <span
                    style={
                      typeOfActions.instPEConexInterior
                        ? { backgroundColor: "blueviolet" }
                        : {}
                    }
                  ></span>
                </li>
                <li>
                  Batería{" "}
                  <span
                    style={
                      typeOfActions.bateria
                        ? { backgroundColor: "blueviolet" }
                        : {}
                    }
                  ></span>
                </li>
                <li>
                  Incidencía{" "}
                  <span
                    style={
                      typeOfActions.incidencia
                        ? { backgroundColor: "blueviolet" }
                        : {}
                    }
                  ></span>
                </li>
                <li>
                  Inst. Clac{" "}
                  <span
                    style={
                      typeOfActions.instClac
                        ? { backgroundColor: "blueviolet" }
                        : {}
                    }
                  ></span>
                </li>
                <li>
                  Otros{" "}
                  <span
                    style={
                      typeOfActions.otros
                        ? { backgroundColor: "blueviolet" }
                        : {}
                    }
                  ></span>
                </li>
              </ul>
            ))}
          </div>
          <div className="ot_sectionOne_div">
            <h2>Materiales :</h2>
            <p>{dataOt.materials}</p>
          </div>
          <div className="ot_sectionOne_div">
            <h2>Observaciones :</h2>
            <p>{dataOt.observations}</p>
          </div>
        </section>
      )}
      {viewRegister && (
        <RegisterOt
          resetSearch={resetSearch}
          setsearch={setsearch}
          userData={userData}
          setViewRegister={setViewRegister}
          search={search}
        />
      )}
    </div>
  );
};

export default Ots;

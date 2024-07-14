import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../utils/getToken";
import TableOt from "../components/historyOB/TableOt";
import TableBattery from "../components/historyOB/TableBattery";

const MyHistory = ({ userData }) => {
  const [viewContain, setViewContain] = useState("ot");
  const [dataUser, setDataUser] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/user/${userData.id}`;

    axios.get(url, config).then((res) => {
      setDataUser(res.data.user);
    });
  }, [userData]);

  return (
    <div className="page__container">
      <section className="page___sectionOne">
        <h1>Historial del Usuario {dataUser?.name} </h1>
      </section>

      <section className="page_buttonsContainer">
        <button
          onClick={() => setViewContain("ot")}
          className={viewContain === "ot" ? "page_buttons_red" : "button"}
        >
          OT
        </button>
        <button
          onClick={() => setViewContain("battery")}
          className={viewContain === "battery" && "page_buttons_green"}
        >
          BATERIA
        </button>
      </section>
      <section className="page___sectionThree">
        {viewContain === "ot" && <TableOt dataUser={dataUser} />}{" "}
        {viewContain === "battery" && <TableBattery dataUser={dataUser} />}{" "}
      </section>
    </div>
  );
};

export default MyHistory;

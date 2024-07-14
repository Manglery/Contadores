import React, { useState } from "react";
import "./pagesStyle/Home.css";
import Ots from "../components/home/Ots";
import Battery from "../components/home/Battery";

const Home = ({ userData }) => {
  const [viewElement, setViewElement] = useState("ot");
  return (
    <div className="Home_container">
      <section className="Home_sectionOne">
        <button
          className="Home_sectionOne_button"
          onClick={() => setViewElement("ot")}
        >
          {" "}
          {viewElement === "ot" ? (
            <i className="bx bxs-circle " style={{ color: "red" }}>
              {" "}
            </i>
          ) : (
            <i className="bx bx-circle"></i>
          )}{" "}
          <p>OT</p>
        </button>

        <button
          className="Home_sectionOne_button"
          onClick={() => setViewElement("battery")}
        >
          {" "}
          {viewElement === "battery" ? (
            <i className="bx bxs-circle" style={{ color: "green" }}></i>
          ) : (
            <i className="bx bx-circle"></i>
          )}{" "}
          <p>Bateria</p>
        </button>
      </section>
      {viewElement === "ot" && <Ots userData={userData} />}
      {viewElement === "battery" && <Battery userData={userData} />}
    </div>
  );
};

export default Home;

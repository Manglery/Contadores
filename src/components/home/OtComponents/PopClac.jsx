import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect } from "react";
import "../homeStyle/PopContador.css";

const PopClac = ({ setScanResultClac, setScannerOpenClac }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("readerclac", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 10,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setTimeout(() => {
        setScanResultClac(result);
        setScannerOpenClac(false);
      }, 100);
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  return (
    <div className="PopContador_container">
      <section>
        <div id="readerclac"></div>
        <button
          className="PopContador_container_buttom"
          onClick={() => {
            setScannerOpenClac(false), scanner.clear();
          }}
        >
          cerrar
        </button>
      </section>
    </div>
  );
};

export default PopClac;

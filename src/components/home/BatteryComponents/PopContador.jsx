import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect } from "react";
import "../homeStyle/PopContador.css";

const PopContador = ({ setScanerResult, setScannerOpen, scannerOpen }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 200,
        height: 200,
      },
      fps: 10,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanerResult(result);
      setScannerOpen(false);
    }

    function error(err) {
      console.warn(err);
    }
  }, [scannerOpen]);

  return (
    <div className="PopContador_container">
      <section>
        <div id="reader"></div>
        <button
          className="PopContador_container_buttom"
          onClick={() => setScannerOpen(false)}
        >
          cerrar
        </button>
      </section>
    </div>
  );
};

export default PopContador;

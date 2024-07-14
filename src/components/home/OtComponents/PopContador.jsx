import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useRef } from "react";
import "../homeStyle/PopContador.css";

const PopContador = ({ setScanerResult, setScannerOpen }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setTimeout(() => {
        setScanerResult(result);
        setScannerOpen(false);
      }, 100);
    }

    function error(err) {
      console.warn(err);
    }

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  return (
    <div className="PopContador_container">
      <section>
        <div id="reader"></div>
        <button
          className="PopContador_container_buttom"
          onClick={() => {
            if (scannerRef.current) {
              scannerRef.current.clear();
            }
            setScannerOpen(false);
          }}
        >
          cerrar
        </button>
      </section>
    </div>
  );
};

export default PopContador;

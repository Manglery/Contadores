import React, { useState } from "react";

const TableOt = ({ dataUser }) => {
  const [numberPage, setNumberPage] = useState(1);
  const viewDataPage = 10;

  // Define el rango de números de página que se mostrarán
  const [startRange, setStartRange] = useState(1);
  const totalPages = Math.ceil(dataUser?.ots?.length / viewDataPage);
  const endRange = Math.min(startRange + 4, totalPages);

  const handlePrevClick = () => {
    setStartRange(1);
    setNumberPage(1);
  };

  const handleNextClick = () => {
    const newStartRange = totalPages > 4 ? totalPages - 4 : 1;
    setStartRange(newStartRange);
    setNumberPage(totalPages);
  };

  const handlePageChange = (page) => {
    setNumberPage(page);
    const newStartRange = Math.max(page - 2, 1);
    setStartRange(newStartRange);
  };

  const handlePrevPageClick = () => {
    if (numberPage > 1) {
      setNumberPage(numberPage - 1);
      const newStartRange = Math.max(numberPage - 3, 1);
      setStartRange(newStartRange);
    }
  };

  const handleNextPageClick = () => {
    if (numberPage < totalPages) {
      setNumberPage(numberPage + 1);
    }
  };

  const startIndex = (numberPage - 1) * viewDataPage;
  const endIndex = Math.min(startIndex + viewDataPage, dataUser?.ots?.length);
  const currentData = dataUser?.ots?.slice(startIndex, endIndex);

  return (
    <>
      <table className="table__container">
        <thead>
          <tr>
            <th>OT MANO</th>
            <th>CLAC</th>
            <th>CONTADOR</th>
            <th>MATERIALES</th>
            <th>OBSERVACIONES</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((ot) => (
            <tr key={ot.id}>
              <td>{ot.ot_mano}</td>
              <td>{ot.clac}</td>
              <td>{ot.counter}</td>
              <td>{ot.materials}</td>
              <td>{ot.observations}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="TableBirds_paginations_container">
        <i className="bx bx-chevrons-left" onClick={handlePrevClick}></i>
        <i className="bx bx-chevron-left" onClick={handlePrevPageClick}></i>
        {Array.from(
          { length: endRange - startRange + 1 },
          (_, index) => startRange + index
        ).map((page) => (
          <div key={page} className="TableBirds_paginations_number">
            <p
              onClick={() => handlePageChange(page)}
              style={{
                color: page === numberPage ? "var(--text-color-red)" : null,
              }}
            >
              {page}
            </p>
            <span>-</span>
          </div>
        ))}
        <i className="bx bx-chevron-right" onClick={handleNextPageClick}></i>
        <i className="bx bx-chevrons-right" onClick={handleNextClick}></i>
      </div>
    </>
  );
};

export default TableOt;

import React, { useEffect, useState } from "react";
import "./IncomeTable.css";

const IncomeTable = () => {
  const [ingresos, setIngresos] = useState([]);

  // Obtener ingresos del backend
  useEffect(() => {
    fetch("http://localhost:3001/api/ingresos")
      .then((response) => response.json())
      .then((data) => setIngresos(data))
      .catch((error) => console.error("Error al obtener los ingresos:", error));
  }, []);

  return (
    <div className="table-container3">
      <h2>Ingresos</h2>
      {/* Tabla para mostrar ingresos */}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Trabajo</th>
            <th>Otros</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {ingresos.map((ingreso) => (
            <tr key={ingreso.id}>
              <td>{ingreso.id}</td>
              <td>{ingreso.usuario_nombre}</td>
              <td>${ingreso.trabajo}</td>
              <td>${ingreso.otros}</td>
              <td>{new Date(ingreso.fecha).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
};

export default IncomeTable;
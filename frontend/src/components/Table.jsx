import React, { useEffect, useState } from "react";
import './Table.css';

const Table = () => {
  const [gastos, setGastos] = useState([]);

  // Fetch datos de gastos desde el backend
  useEffect(() => {
    fetch("http://localhost:3001/api/gastos")
      .then((response) => response.json())
      .then((data) => setGastos(data))
      .catch((error) => console.error("Error fetching gastos:", error));
  }, []);

  // Función para formatear la fecha
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

   // Función para eliminar un gasto
   const deleteGasto = (id) => {
    fetch(`http://localhost:3001/api/gastos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Actualizar el estado local para eliminar el gasto de la tabla
          setGastos(gastos.filter((gasto) => gasto.id !== id));
        } else {
          console.error("Error eliminando el gasto");
        }
      })
      .catch((error) => console.error("Error al eliminar el gasto:", error));
  };

  return (
    <div className="table-container">
      <h2>Gastos: </h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Categoría</th>
            <th>Producto</th>
            <th>Fecha</th>
            <th>Precio</th>
            <th>Prioridad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {gastos.map((gasto) => (
            <tr key={gasto.id}>
              <td>{gasto.id}</td>
              <td>{gasto.categoria}</td>
              <td>{gasto.producto}</td>
              <td>{formatDate(gasto.fecha)}</td> {/* Formatear la fecha */}
              <td>${gasto.precio}</td>
              <td>{gasto.prioridad}</td>

              <td>
                <button
                  className="delete-button"
                  onClick={() => deleteGasto(gasto.id)}
                >
                  X 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
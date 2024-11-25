// Gráfico de quién gasta más de los 2
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Chart2.css';

// Registrar los componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const [gastosData, setGastosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hacer la solicitud a la ruta /api/gastos/total para obtener los datos de los gastos
    fetch("http://localhost:3001/api/gastos/total")
      .then((response) => response.json())
      .then((data) => {
        setGastosData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching total gastos:", error);
        setError("Hubo un problema al cargar los datos.");
        setLoading(false);
      });
  }, []);

  // Datos para el gráfico de torta
  const chartData = {
    labels: gastosData.map((usuario) => usuario.nombre),
    datasets: [
      {
        data: gastosData.map((usuario) => usuario.total_gastos),
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  // Si hay error, muestra un mensaje de error
  if (error) {
    return <div>{error}</div>;
  }

  // Si está cargando, muestra un mensaje de carga
  if (loading) {
    return <div>Cargando datos...</div>;
  }

  // Mostrar gráfico y reporte numérico
  return (
    <div className="chart-container2">
      <h2 className="chart-title2">Gastos Totales por usuario</h2>
      <Pie data={chartData} />
      <div className="reporte2">
        {gastosData.map((usuario) => (
          <div key={usuario.nombre} className="reporte-item2">
            <p><strong>{usuario.nombre} - Total Gastos: </strong>${usuario.total_gastos.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
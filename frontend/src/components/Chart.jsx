import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Chart.css';

// Registrar los componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const [gastosData, setGastosData] = useState([]);
  const [ingresosData, setIngresosData] = useState(0); // Inicializamos en 0
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch de los gastos desde el backend
    fetch("http://localhost:3001/api/gastos")
      .then((response) => response.json())
      .then((gastos) => {
        const categorias = {};

        // Agrupar los gastos por categoría
        gastos.forEach((gasto) => {
          if (gasto.categoria && gasto.precio !== undefined) {
            categorias[gasto.categoria] = (categorias[gasto.categoria] || 0) + parseFloat(gasto.precio); // Asegurarse de que 'precio' es número
          }
        });

        // Establecer los datos de gastos en el estado
        setGastosData(Object.entries(categorias));
      })
      .catch((error) => {
        console.error("Error fetching gastos:", error);
        setError("Hubo un problema al cargar los gastos.");
      });

    // Fetch de los ingresos desde el backend
    fetch("http://localhost:3001/api/ingresos")
      .then((response) => response.json())
      .then((ingresos) => {
        const totalIngresos = ingresos.reduce((total, ingreso) => total + parseFloat(ingreso.trabajo) + parseFloat(ingreso.otros), 0); // Asegurarse de que sean números
        setIngresosData(totalIngresos); // Total de ingresos
        setLoading(false); // Datos cargados
      })
      .catch((error) => {
        console.error("Error fetching ingresos:", error);
        setError("Hubo un problema al cargar los ingresos.");
        setLoading(false);
      });
  }, []);

  // Datos para el gráfico de torta
  const chartData = {
    labels: gastosData.map(([categoria]) => categoria),
    datasets: [
      {
        data: gastosData.map(([, precio]) => precio),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF5733", "#8E44AD", "#F39C12"
        ],
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

  // Calcular el total de gastos
  const totalGastos = gastosData.reduce((total, [, precio]) => total + precio, 0);

  // Calcular la diferencia entre ingresos y gastos
  const saldo = ingresosData - totalGastos;

  // Formatear los números en CLP (Pesos chilenos)
  const formatCLP = (value) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(value);
  };

  return (
    <div className="chart-containerr">
      <h2 className="chart-titlee">Distribución de Gastos</h2>
      <div className="chart-and-report">
        <div className="chart1">
          <Pie data={chartData} />
        </div>
      
        <div className="reporte">
          <h3>Reporte Financiero</h3>
          <p><strong>Total de Ingresos: </strong>{formatCLP(ingresosData)}</p>
          <p><strong>Total de Gastos: </strong>{formatCLP(totalGastos)}</p>
          <p><strong>Saldo Restante (Ingresos - Gastos): </strong>{formatCLP(saldo)}</p>
        </div>
      </div>
    </div>
  );  
};

export default Chart;
import React from "react";
import Chart from "../components/Chart";
import Chart2 from "../components/Chart2";  
import './Dashboard.css';
import Table from "../components/Table";  
import IncomeTable from "../components/IncomeTable";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Tablero de Finanzas</h1>
      <div className="chart-container2">
        {/* Gráfico de torta */}
        <div className="chart1">
          <Chart />
        </div>

        {/* Gráfico de barras */}
        <div className="chart2">
          <Chart2 /> 
        </div>
      </div>

      {/* Tabla de gastos */}
      <div className="table-containerr">
        <Table />
      </div>
      <div className="table-income-container">
        <IncomeTable />
      </div>
    </div>
  );
};

export default Dashboard;
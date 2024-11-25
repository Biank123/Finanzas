import React from "react";
import IncomeForm from "../components/IncomeForm";
import './AddIncome.css';

const AddExpense = () => {
  return (
    <div className="add-income-container">
      <h1>Ingresos</h1>
      <div className="income-form-container">
      <IncomeForm />
      </div>
    </div>
  );
};

export default AddExpense;
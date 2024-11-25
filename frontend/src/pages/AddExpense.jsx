// Página con el formulario

import React from "react";
import Form from "../components/Form";
import './AddExprense.css';

const AddExpense = () => {
  return (
    <div className="add-expense-container">
      <h1>Gastos</h1>
      <div className="form-container">
      <Form />
      </div>
    </div>
  );
};

export default AddExpense;


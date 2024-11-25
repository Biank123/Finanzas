 // Barra de navegación

 import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="menu" style={{ listStyleType: "none", display: "flex", gap: "10px" }}>
        <li>
          <Link to="/">Tablero</Link>
        </li>
        <li>
          <Link to="/add-expense">Agregar Gasto</Link>
        </li>
        <li>
          <Link to="/add-income">Agregar Ingreso</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import "./IncomeForm.css";

const IncomeForm = () => {
  const [ingresos, setIngresos] = useState([]);
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar los usuarios
  const [newIngreso, setNewIngreso] = useState({
    usuario_id: "",
    trabajo: "",
    otros: "",
    fecha: "",
  });

  // Obtener usuarios del backend
  useEffect(() => {
    fetch("http://localhost:3001/api/usuarios") 
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error("Error al obtener usuarios:", error));
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewIngreso({ ...newIngreso, [name]: value });
  };

  // Enviar nuevo ingreso al backend
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/api/ingresos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newIngreso),
    })
      .then((response) => response.json())
      .then((data) => {
        setIngresos([...ingresos, data]); // Actualizar la tabla con el nuevo ingreso
        setNewIngreso({ usuario_id: "", trabajo: "", otros: "", fecha: "" }); // Limpiar formulario
      })
      .catch((error) => console.error("Error al añadir el ingreso:", error));
  };

  return (
    <div className="income-form-container">
      {/* Formulario para añadir un nuevo ingreso */}
      <h3>Añadir Nuevo Ingreso</h3>
      <form className="income-form" onSubmit={handleSubmit}>
        <label>
          Usuario:
          <select
            name="usuario_id"
            value={newIngreso.usuario_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un usuario</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>
          Trabajo:
          <input
            type="number"
            name="trabajo"
            value={newIngreso.trabajo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Otros:
          <input
            type="number"
            name="otros"
            value={newIngreso.otros}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Fecha:
          <input
            type="date"
            name="fecha"
            value={newIngreso.fecha}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Añadir Ingreso</button>
      </form>
    </div>
  );
};

export default IncomeForm;

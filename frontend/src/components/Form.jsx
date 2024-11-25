import React, { useState, useEffect } from "react";
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    usuario_id: "",
    categoria: "",
    producto: "",
    fecha: "",
    precio: "",
    prioridad: "",
  });

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Obtener la lista de usuarios desde el backend
    fetch("http://localhost:3001/api/usuarios")
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error("Error fetching usuarios:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar los datos del formulario al backend
    fetch("http://localhost:3001/api/gastos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Gasto agregado:", data);
        alert("Gasto agregado correctamente");

        // Limpiar el formulario después de agregar el gasto
        setFormData({
          usuario_id: "",
          categoria: "",
          producto: "",
          fecha: "",
          precio: "",
          prioridad: "",
        });
      })
      .catch((error) => console.error("Error agregando gasto:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Agregar Nuevo Gasto</h2>

      <label>
        Usuario:
        <select
          name="usuario_id"
          value={formData.usuario_id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar un usuario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nombre}
            </option>
          ))}
        </select>
      </label>
      <br />

      <label>
        Categoría:
        <select
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          required
          >
          <option value="">Seleccionar categoría</option>
          <option>Comida</option>
          <option>Transporte</option>
          <option>Vestimenta</option>
          <option>Arriendo</option>
          <option>Gastos comunes</option>
          <option>Agua</option>
          <option>Servicios</option>
          <option>Insumos</option>
          <option>Ahorros</option>
          <option>Entretenimiento</option>
          <option>Otros</option>
        </select>
      </label>
      <br />

      <label>
        Producto o servicio:
        <input
          type="text"
          name="producto"
          value={formData.producto}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Fecha:
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Precio:
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Prioridad (1 más - 4 menos):
        <input
          type="number"
          name="prioridad"
          value={formData.prioridad}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <button type="submit">Agregar</button>
    </form>
  );
};

export default Form;

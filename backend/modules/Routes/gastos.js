const express = require('express');
const pool = require('../../db/conexionDB');

const router = express.Router();

// Obtener todos los gastos con el nombre del usuario
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT g.*, u.nombre AS usuario_nombre 
       FROM gastos g
       JOIN usuarios u ON g.usuario_id = u.id`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
});

// Crear un nuevo gasto
router.post('/', async (req, res) => {
  const { usuario_id, categoria, producto, fecha, precio, prioridad } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO gastos (usuario_id, categoria, producto, fecha, precio, prioridad) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [usuario_id, categoria, producto, fecha, precio, prioridad]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
});

router.get("/total", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT usuarios.nombre, SUM(gastos.precio) AS total_gastos
      FROM gastos
      JOIN usuarios ON gastos.usuario_id = usuarios.id
      GROUP BY usuarios.nombre
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching total gastos:", error);
    res.status(500).json({ message: "Error al obtener los gastos" });
  }
});

// Eliminar un gasto por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM gastos WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }
    res.json({ message: 'Gasto eliminado exitosamente', gasto: result.rows[0] });
  } catch (error) {
    console.error('Error eliminando el gasto:', error.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;


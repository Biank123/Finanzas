const express = require('express');
const pool = require('../../db/conexionDB');

const router = express.Router();

// Obtener todos los ingresos con el nombre del usuario
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT i.*, u.nombre AS usuario_nombre 
       FROM ingresos i
       JOIN usuarios u ON i.usuario_id = u.id`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
});

// Crear un nuevo ingreso
router.post('/', async (req, res) => {
  const { usuario_id, trabajo, otros, fecha } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ingresos (usuario_id, trabajo, otros, fecha) VALUES ($1, $2, $3, $4) RETURNING *',
      [usuario_id, trabajo, otros, fecha]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;


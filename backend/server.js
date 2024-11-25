const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usuariosRoutes = require('./modules/Routes/usuarios');
const ingresosRoutes = require('./modules/Routes/ingresos');
const gastosRoutes = require('./modules/Routes/gastos');

require('dotenv').config();

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/ingresos', ingresosRoutes);
app.use('/api/gastos', gastosRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Requiere la conexión de la base de datos
require('./config/database');

// Importando tus middlewares
// const { setupSecurityMiddlewares, csrfTokenMiddleware } = require('./middlewares/middlewares');

// Middlewares
// setupSecurityMiddlewares(app);
// app.use(csrfTokenMiddleware);

// Middleware para parsear el cuerpo del request en formato JSON
app.use(express.json());

// Ruta por defecto
app.get('/', (req, res) => {
  res.send(`
    <h1>API de Usuarios</h1>
    <p>Endpoints disponibles:</p>
    <ul>
      <li>GET /usuarios</li>
      <li>POST /usuarios</li>
      <li>PUT /usuarios/:id</li>
      <li>DELETE /usuarios/:id</li>
    </ul>
  `);
});

// Rutas (por ahora solo tienes la de usuarios, pero podrías añadir más en el futuro)
const usuariosRoutes = require('./routes/usuariosRoutes');
app.use('/usuarios', usuariosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

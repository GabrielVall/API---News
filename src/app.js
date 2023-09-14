const express = require('express');
const usuariosRoutes = require('./routes/usuariosRoutes');
const app = express();
const PORT = 3000;

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

// Rutas
app.use('/usuarios', usuariosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

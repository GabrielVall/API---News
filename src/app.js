const express = require('express');
const mysql = require('mysql2');
const helmet = require('helmet');
const csrf = require('csurf');
const path = require('path');
const app = express();
const PORT = 3000;

// Middlewares de seguridad
app.use(helmet()); // Esto añade varias capas de seguridad configurando encabezados HTTP.
app.use(csrf()); // Protección contra CSRF

// Middleware para parsear el cuerpo del request en formato JSON
app.use(express.json());

// Configuración de la conexión
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Intento de conexión
connection.connect(error => {
  if (error) {
    console.error('Error conectando a la base de datos:', error.stack);
    return;
  }
  console.log('Conectado a la base de datos con el ID', connection.threadId);
});

// Añadir variable CSRF a todas las respuestas
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

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
    <form action="/usuarios" method="post">
      <input type="hidden" name="_csrf" value="${res.locals.csrfToken}">
      <!-- otros campos del formulario -->
      <button type="submit">Crear Usuario</button>
    </form>
  `);
});

// Rutas (por ahora solo tienes la de usuarios, pero podrías añadir más en el futuro)
const usuariosRoutes = require('./routes/usuariosRoutes');
app.use('/usuarios', usuariosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

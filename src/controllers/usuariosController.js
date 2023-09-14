const connection = require('../config/database.js');

// Seleccionar todos los usuarios o buscar
exports.getUsuarios = (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    
    // Si se envía un parámetro de búsqueda q
    if (req.query.q) {
      const busqueda = `%${req.query.q}%`;
      
      connection.query('SELECT * FROM usuarios WHERE nombre LIKE ? LIMIT ? OFFSET ?', [busqueda, limit, offset], (error, results) => {
        if (error) {
          console.error('Error ejecutando la consulta:', error.stack);
          res.status(500).send('Error ejecutando la consulta');
          return;
        }
        res.json(results);
      });
    } else {
      connection.query('SELECT * FROM usuarios LIMIT ? OFFSET ?', [limit, offset], (error, results) => {
        if (error) {
          console.error('Error ejecutando la consulta:', error.stack);
          res.status(500).send('Error ejecutando la consulta');
          return;
        }
        res.json(results);
      });
    }
  };
  

// Seleccionar usuario por ID
exports.getUsuarioById = (req, res) => {
  const id = req.params.id;

  connection.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id], (error, results) => {
    if (error || results.length === 0) {
      res.status(404).send('Usuario no encontrado');
      return;
    }
    res.json(results[0]);
  });
};

// Crear usuario
exports.crearUsuario = (req, res) => {
  const usuario = req.body;

  connection.query('INSERT INTO usuarios SET ?', usuario, (error, results) => {
    if (error) {
      console.error('Error al insertar:', error.stack);
      res.status(500).send('Error al insertar usuario');
      return;
    }
    res.status(201).send(`Usuario creado con ID: ${results.insertId}`);
  });
};

// Editar usuario
exports.editarUsuario = (req, res) => {
  const id = req.params.id;
  const usuarioActualizado = req.body;

  connection.query('UPDATE usuarios SET ? WHERE id = ?', [usuarioActualizado, id], (error) => {
    if (error) {
      console.error('Error al editar:', error.stack);
      res.status(500).send('Error al editar usuario');
      return;
    }
    res.send('Usuario actualizado con éxito');
  });
};

// Eliminar usuario
exports.eliminarUsuario = (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error) => {
    if (error) {
      console.error('Error al eliminar:', error.stack);
      res.status(500).send('Error al eliminar usuario');
      return;
    }
    res.send('Usuario eliminado con éxito');
  });
};

// Buscar usuarios
exports.buscarUsuarios = (req, res) => {
  const busqueda = `%${req.query.q}%`; // usamos % para buscar subcadenas en SQL
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  connection.query('SELECT * FROM usuarios WHERE nombre LIKE ? LIMIT ? OFFSET ?', [busqueda, limit, offset], (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error.stack);
      res.status(500).send('Error ejecutando la consulta');
      return;
    }
    res.json(results);
  });
};

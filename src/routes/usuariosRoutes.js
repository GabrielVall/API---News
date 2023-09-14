const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.getUsuarios);
router.get('/buscar', usuariosController.buscarUsuarios); // Debe ir antes de /:id para que no tome 'buscar' como un id
router.get('/:id', usuariosController.getUsuarioById);
router.post('/', usuariosController.crearUsuario);
router.put('/:id', usuariosController.editarUsuario);
router.delete('/:id', usuariosController.eliminarUsuario);

module.exports = router;

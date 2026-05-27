const express = require('express');
const router = express.Router();
const {
  registrarUsuario,
  loginUsuario,
  obtenerPerfil,
  actualizarUsuario,
  actualizarPerfil,
  obtenerUsuarios,
  cambiarRol,
  eliminarUsuario
} = require('../controllers/authController');
const { protegerRuta } = require('../middlewares/authMiddleware');
const { soloAdmin, cualquierUsuario } = require('../middlewares/roleMiddleware');

// Rutas públicas
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

// Rutas protegidas (cualquier usuario autenticado)
router.get('/perfil', protegerRuta, cualquierUsuario, obtenerPerfil);
router.put('/perfil', protegerRuta, cualquierUsuario, actualizarPerfil);

// Rutas solo admin
router.get('/usuarios', protegerRuta, soloAdmin, obtenerUsuarios);
// Actualizar usuario (solo admin)
router.put('/usuarios/:id', protegerRuta, soloAdmin, actualizarUsuario);
router.put('/usuarios/:id/rol', protegerRuta, soloAdmin, cambiarRol);
router.delete('/usuarios/:id', protegerRuta, soloAdmin, eliminarUsuario);

module.exports = router;
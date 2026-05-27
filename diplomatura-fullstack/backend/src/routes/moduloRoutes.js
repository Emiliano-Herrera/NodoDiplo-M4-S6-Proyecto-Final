const express = require('express');
const router = express.Router();
const {
  crearModulo,
  obtenerModulos,
  obtenerModuloById,
  actualizarModulo,
  eliminarModulo
} = require('../controllers/moduloController');
const { protegerRuta } = require('../middlewares/authMiddleware');
const { soloAdmin, soloAdminOEditor } = require('../middlewares/roleMiddleware');

// Rutas públicas
router.get('/', obtenerModulos);
router.get('/:id', obtenerModuloById);

// Rutas protegidas
router.post('/', protegerRuta, soloAdmin, crearModulo);
router.put('/:id', protegerRuta, soloAdminOEditor, actualizarModulo);
router.delete('/:id', protegerRuta, soloAdmin, eliminarModulo);

module.exports = router;
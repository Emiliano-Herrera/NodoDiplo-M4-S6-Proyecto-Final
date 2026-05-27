const express = require('express');
const router = express.Router();
const {
  crearProyecto,
  obtenerProyectoPorModulo,
  actualizarProyecto,
  eliminarProyecto
} = require('../controllers/proyectoController');
const { protegerRuta } = require('../middlewares/authMiddleware');
const { soloAdmin, soloAdminOEditor } = require('../middlewares/roleMiddleware');

// Rutas públicas
router.get('/modulo/:moduloId', obtenerProyectoPorModulo);

// Rutas protegidas
router.post('/', protegerRuta, soloAdmin, crearProyecto);
router.put('/:id', protegerRuta, soloAdminOEditor, actualizarProyecto);
router.delete('/:id', protegerRuta, soloAdmin, eliminarProyecto);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  crearProfesor,
  obtenerProfesores,
  obtenerProfesorById,
  actualizarProfesor,
  eliminarProfesor
} = require('../controllers/profesorController');
const { protegerRuta } = require('../middlewares/authMiddleware');
const { soloAdmin, soloAdminOEditor } = require('../middlewares/roleMiddleware');

// Rutas públicas (todos pueden ver)
router.get('/', obtenerProfesores);
router.get('/:id', obtenerProfesorById);

// Rutas protegidas
router.post('/', protegerRuta, soloAdmin, crearProfesor);
router.put('/:id', protegerRuta, soloAdminOEditor, actualizarProfesor);
router.delete('/:id', protegerRuta, soloAdmin, eliminarProfesor);

module.exports = router;
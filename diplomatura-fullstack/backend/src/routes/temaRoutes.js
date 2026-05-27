const express = require('express');
const router = express.Router();
const {
  crearTema,
  obtenerTemasPorModulo,
  obtenerTemaById,
  actualizarTema,
  eliminarTema
} = require('../controllers/temaController');
const { protegerRuta } = require('../middlewares/authMiddleware');
const { soloAdmin, soloAdminOEditor } = require('../middlewares/roleMiddleware');

// Rutas públicas
// Obtener temas por módulo (público)
router.get('/modulo/:moduloId', obtenerTemasPorModulo);
router.get('/:id', obtenerTemaById);

// Rutas protegidas
router.post('/', protegerRuta, soloAdmin, crearTema);
router.put('/:id', protegerRuta, soloAdminOEditor, actualizarTema);
router.delete('/:id', protegerRuta, soloAdmin, eliminarTema);

module.exports = router;
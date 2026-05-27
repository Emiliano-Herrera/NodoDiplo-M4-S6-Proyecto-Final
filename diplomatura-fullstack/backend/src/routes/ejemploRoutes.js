const express = require('express');
const router = express.Router();
const {
  crearEjemplo,
  obtenerEjemplosPorTema,
  obtenerEjemploById,
  actualizarEjemplo,
  eliminarEjemplo,
  agregarImagen
} = require('../controllers/ejemploController');
const { protegerRuta } = require('../middlewares/authMiddleware');
const { soloAdmin, soloAdminOEditor } = require('../middlewares/roleMiddleware');

// Rutas públicas
router.get('/tema/:temaId', obtenerEjemplosPorTema);
router.get('/:id', obtenerEjemploById);

// Rutas protegidas
router.post('/', protegerRuta, soloAdmin, crearEjemplo);
router.put('/:id', protegerRuta, soloAdminOEditor, actualizarEjemplo);
router.delete('/:id', protegerRuta, soloAdmin, eliminarEjemplo);
router.post('/:id/imagenes', protegerRuta, soloAdminOEditor, agregarImagen);

module.exports = router;
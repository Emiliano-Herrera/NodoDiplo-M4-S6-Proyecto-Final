const express = require('express');
const router = express.Router();
const {
  obtenerLenguajes,
  obtenerLenguajeById
} = require('../controllers/lenguajeController');

// Todas las rutas son públicas (visitantes pueden ver)
router.get('/', obtenerLenguajes);
router.get('/:id', obtenerLenguajeById);

module.exports = router;
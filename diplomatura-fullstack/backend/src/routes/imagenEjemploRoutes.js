const express = require('express');
const router = express.Router();
const { protegerRuta } = require('../middlewares/authMiddleware');
const { soloAdminOEditor } = require('../middlewares/roleMiddleware');
const ImagenEjemplo = require('../models/ImagenEjemplo');

// Obtener imágenes por ejemplo
router.get('/ejemplo/:ejemploId', async (req, res) => {
  try {
    const imagenes = await ImagenEjemplo.find({ ejemplo_id: req.params.ejemploId }).sort({ orden: 1 });
    res.json(imagenes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear imagen
router.post('/', protegerRuta, soloAdminOEditor, async (req, res) => {
  try {
    const { ejemplo_id, url, descripcion, orden } = req.body;
    const imagen = await ImagenEjemplo.create({ ejemplo_id, url, descripcion, orden });
    res.status(201).json(imagen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar imagen
router.delete('/:id', protegerRuta, soloAdminOEditor, async (req, res) => {
  try {
    await ImagenEjemplo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Imagen eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
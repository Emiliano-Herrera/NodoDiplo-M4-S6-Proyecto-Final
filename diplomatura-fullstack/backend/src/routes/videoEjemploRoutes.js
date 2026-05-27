const express = require('express');
const router = express.Router();
const { protegerRuta } = require('../middlewares/authMiddleware');
const { soloAdminOEditor } = require('../middlewares/roleMiddleware');
const VideoEjemplo = require('../models/VideoEjemplo');

// Obtener videos por ejemplo
router.get('/ejemplo/:ejemploId', async (req, res) => {
  try {
    const videos = await VideoEjemplo.find({ ejemplo_id: req.params.ejemploId }).sort({ orden: 1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear video
router.post('/', protegerRuta, soloAdminOEditor, async (req, res) => {
  try {
    const { ejemplo_id, url, titulo, tipo, orden } = req.body;
    const video = await VideoEjemplo.create({ ejemplo_id, url, titulo, tipo, orden });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar video
router.delete('/:id', protegerRuta, soloAdminOEditor, async (req, res) => {
  try {
    await VideoEjemplo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Video eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
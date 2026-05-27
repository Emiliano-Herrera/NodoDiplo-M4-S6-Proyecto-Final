const express = require('express');
const router = express.Router();
const { protegerRuta } = require('../middlewares/authMiddleware');
const { soloAdminOEditor } = require('../middlewares/roleMiddleware');
const RecursoEjemplo = require('../models/RecursoEjemplo');

// Obtener recursos por ejemplo
router.get('/ejemplo/:ejemploId', async (req, res) => {
  try {
    const recursos = await RecursoEjemplo.find({ ejemplo_id: req.params.ejemploId }).sort({ orden: 1 });
    res.json(recursos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear recurso
router.post('/', protegerRuta, soloAdminOEditor, async (req, res) => {
  try {
    const { ejemplo_id, url, titulo, descripcion, tipo, orden } = req.body;
    const recurso = await RecursoEjemplo.create({ ejemplo_id, url, titulo, descripcion, tipo, orden });
    res.status(201).json(recurso);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar recurso
router.delete('/:id', protegerRuta, soloAdminOEditor, async (req, res) => {
  try {
    await RecursoEjemplo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recurso eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
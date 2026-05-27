const Tema = require('../models/Tema');
const Ejemplo = require('../models/Ejemplo');

// @desc   Crear tema (solo admin)
// @route  POST /api/temas
// @access Admin
const crearTema = async (req, res) => {
  try {
    const tema = await Tema.create(req.body);
    res.status(201).json(tema);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Obtener temas por módulo (público)
// @route  GET /api/temas/modulo/:moduloId
// @access Público
const obtenerTemasPorModulo = async (req, res) => {
  try {
    const temas = await Tema.find({ modulo_id: req.params.moduloId })
      .sort({ orden: 1 });
    res.json(temas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Obtener tema por ID (público, con sus ejemplos)
// @route  GET /api/temas/:id
// @access Público
const obtenerTemaById = async (req, res) => {
  try {
    const tema = await Tema.findById(req.params.id);
    if (!tema) {
      return res.status(404).json({ message: 'Tema no encontrado' });
    }
    
    const ejemplos = await Ejemplo.find({ tema_id: tema._id });
    res.json({ ...tema.toObject(), ejemplos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Actualizar tema (admin o editor)
// @route  PUT /api/temas/:id
// @access Admin o Editor
const actualizarTema = async (req, res) => {
  try {
    const tema = await Tema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!tema) {
      return res.status(404).json({ message: 'Tema no encontrado' });
    }
    res.json(tema);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Eliminar tema (solo admin)
// @route  DELETE /api/temas/:id
// @access Admin
const eliminarTema = async (req, res) => {
  try {
    const tema = await Tema.findByIdAndDelete(req.params.id);
    if (!tema) {
      return res.status(404).json({ message: 'Tema no encontrado' });
    }
    // Eliminar ejemplos asociados
    await Ejemplo.deleteMany({ tema_id: req.params.id });
    res.json({ message: 'Tema eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearTema,
  obtenerTemasPorModulo,
  obtenerTemaById,
  actualizarTema,
  eliminarTema
};
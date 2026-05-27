const Ejemplo = require('../models/Ejemplo');
const ImagenEjemplo = require('../models/ImagenEjemplo');

// @desc   Crear ejemplo (solo admin)
// @route  POST /api/ejemplos
// @access Admin
const crearEjemplo = async (req, res) => {
  try {
    const ejemplo = await Ejemplo.create(req.body);
    res.status(201).json(ejemplo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Obtener ejemplos por tema (público)
// @route  GET /api/ejemplos/tema/:temaId
// @access Público
const obtenerEjemplosPorTema = async (req, res) => {
  try {
    const ejemplos = await Ejemplo.find({ tema_id: req.params.temaId });
    res.json(ejemplos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Obtener ejemplo por ID (público, con sus imágenes)
// @route  GET /api/ejemplos/:id
// @access Público
const obtenerEjemploById = async (req, res) => {
  try {
    const ejemplo = await Ejemplo.findById(req.params.id);
    if (!ejemplo) {
      return res.status(404).json({ message: 'Ejemplo no encontrado' });
    }
    
    const imagenes = await ImagenEjemplo.find({ ejemplo_id: ejemplo._id })
      .sort({ orden: 1 });
    res.json({ ...ejemplo.toObject(), imagenes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Actualizar ejemplo (admin o editor)
// @route  PUT /api/ejemplos/:id
// @access Admin o Editor
const actualizarEjemplo = async (req, res) => {
  try {
    const ejemplo = await Ejemplo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!ejemplo) {
      return res.status(404).json({ message: 'Ejemplo no encontrado' });
    }
    res.json(ejemplo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Eliminar ejemplo (solo admin)
// @route  DELETE /api/ejemplos/:id
// @access Admin
const eliminarEjemplo = async (req, res) => {
  try {
    const ejemplo = await Ejemplo.findByIdAndDelete(req.params.id);
    if (!ejemplo) {
      return res.status(404).json({ message: 'Ejemplo no encontrado' });
    }
    // Eliminar imágenes asociadas
    await ImagenEjemplo.deleteMany({ ejemplo_id: req.params.id });
    res.json({ message: 'Ejemplo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Agregar imagen a ejemplo (admin o editor)
// @route  POST /api/ejemplos/:id/imagenes
// @access Admin o Editor
const agregarImagen = async (req, res) => {
  try {
    const { url, descripcion, orden } = req.body;
    const imagen = await ImagenEjemplo.create({
      ejemplo_id: req.params.id,
      url,
      descripcion,
      orden: orden || 1
    });
    res.status(201).json(imagen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearEjemplo,
  obtenerEjemplosPorTema,
  obtenerEjemploById,
  actualizarEjemplo,
  eliminarEjemplo,
  agregarImagen
};
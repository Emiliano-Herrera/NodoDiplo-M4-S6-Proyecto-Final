const Modulo = require('../models/Modulo');
const Tema = require('../models/Tema');
const ProyectoFinal = require('../models/ProyectoFinal');

// @desc   Crear módulo (solo admin)
// @route  POST /api/modulos
// @access Admin
const crearModulo = async (req, res) => {
  try {
    const modulo = await Modulo.create(req.body);
    // Populate profesor_id para devolver datos completos
    await modulo.populate('profesor_id');
    res.status(201).json(modulo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Obtener todos los módulos (público, con paginación y búsqueda)
// @route  GET /api/modulos
// @access Público
const obtenerModulos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    
    const query = search ? { nombre: { $regex: search, $options: 'i' } } : {};
    
    const modulos = await Modulo.find(query)
      .populate('profesor_id')
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ orden: 1 });
    
    const total = await Modulo.countDocuments(query);
    
    res.json({
      modulos,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Obtener módulo por ID (público, con sus temas y proyecto final)
// @route  GET /api/modulos/:id
// @access Público
const obtenerModuloById = async (req, res) => {
  try {
    const modulo = await Modulo.findById(req.params.id).populate('profesor_id');
    if (!modulo) {
      return res.status(404).json({ message: 'Módulo no encontrado' });
    }
    
    // Obtener temas del módulo
    const temas = await Tema.find({ modulo_id: modulo._id }).sort({ orden: 1 });
    
    // Obtener proyecto final
    const proyecto = await ProyectoFinal.findOne({ modulo_id: modulo._id });
    
    res.json({
      ...modulo.toObject(),
      temas,
      proyecto_final: proyecto
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Actualizar módulo (admin o editor)
// @route  PUT /api/modulos/:id
// @access Admin o Editor
const actualizarModulo = async (req, res) => {
  try {
    const { nombre, descripcion, orden, duracion_semanas, profesor_id, imagen_portada } = req.body;
    
    // Usar returnDocument: 'after' en lugar de new (para eliminar la advertencia)
    const modulo = await Modulo.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        descripcion,
        orden,
        duracion_semanas,
        profesor_id: profesor_id || null,
        imagen_portada
      },
      { 
        returnDocument: 'after',  // ← Cambiar 'new' por 'returnDocument'
        runValidators: true 
      }
    ).populate('profesor_id', 'nombre email especialidad');
    
    if (!modulo) {
      return res.status(404).json({ message: 'Módulo no encontrado' });
    }
    
    console.log("✅ Módulo actualizado:", modulo);
    res.json(modulo);
  } catch (error) {
    console.error("❌ Error al actualizar módulo:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc   Eliminar módulo (solo admin)
// @route  DELETE /api/modulos/:id
// @access Admin
const eliminarModulo = async (req, res) => {
  try {
    const modulo = await Modulo.findByIdAndDelete(req.params.id);
    if (!modulo) {
      return res.status(404).json({ message: 'Módulo no encontrado' });
    }
    // También eliminar temas asociados
    await Tema.deleteMany({ modulo_id: req.params.id });
    await ProyectoFinal.deleteOne({ modulo_id: req.params.id });
    res.json({ message: 'Módulo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearModulo,
  obtenerModulos,
  obtenerModuloById,
  actualizarModulo,
  eliminarModulo
};
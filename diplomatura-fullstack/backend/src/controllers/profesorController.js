const Profesor = require('../models/Profesor');

// @desc   Crear profesor (solo admin)
// @route  POST /api/profesores
// @access Admin
const crearProfesor = async (req, res) => {
  try {
    const { nombre, email, biografia, especialidad, modulo_id } = req.body;
    const profesor = await Profesor.create({
      nombre,
      email,
      biografia,
      especialidad,
      modulo_id: modulo_id || null
    });
    res.status(201).json(profesor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Obtener todos los profesores (público, con paginación)
// @route  GET /api/profesores
// @access Público
const obtenerProfesores = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    
    const query = search ? { nombre: { $regex: search, $options: 'i' } } : {};
    
    const profesores = await Profesor.find(query)
      .populate('modulo_id', 'nombre')
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ nombre: 1 });
    
    const total = await Profesor.countDocuments(query);
    
    res.json({
      profesores,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Obtener profesor por ID (público)
// @route  GET /api/profesores/:id
// @access Público
const obtenerProfesorById = async (req, res) => {
  try {
    const profesor = await Profesor.findById(req.params.id).populate('modulo_id', 'nombre');
    if (!profesor) {
      return res.status(404).json({ message: 'Profesor no encontrado' });
    }
    res.json(profesor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Actualizar profesor (admin o editor)
// @route  PUT /api/profesores/:id
// @access Admin o Editor
const actualizarProfesor = async (req, res) => {
  try {
    const { nombre, email, biografia, especialidad, modulo_id } = req.body;
    const profesor = await Profesor.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        email,
        biografia,
        especialidad,
        modulo_id: modulo_id || null
      },
      { new: true, runValidators: true }
    ).populate('modulo_id', 'nombre');
    
    if (!profesor) {
      return res.status(404).json({ message: 'Profesor no encontrado' });
    }
    res.json(profesor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Eliminar profesor (solo admin)
// @route  DELETE /api/profesores/:id
// @access Admin
const eliminarProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findByIdAndDelete(req.params.id);
    if (!profesor) {
      return res.status(404).json({ message: 'Profesor no encontrado' });
    }
    res.json({ message: 'Profesor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearProfesor,
  obtenerProfesores,
  obtenerProfesorById,
  actualizarProfesor,
  eliminarProfesor
};
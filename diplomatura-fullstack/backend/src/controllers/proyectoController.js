const ProyectoFinal = require('../models/ProyectoFinal');

// @desc   Crear proyecto final (solo admin)
// @route  POST /api/proyectos
// @access Admin
const crearProyecto = async (req, res) => {
  try {
    const proyecto = await ProyectoFinal.create(req.body);
    res.status(201).json(proyecto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Obtener proyecto por módulo (público)
// @route  GET /api/proyectos/modulo/:moduloId
// @access Público
const obtenerProyectoPorModulo = async (req, res) => {
  try {
    const proyecto = await ProyectoFinal.findOne({ modulo_id: req.params.moduloId });
    if (!proyecto) {
      return res.status(404).json({ message: 'Proyecto no encontrado para este módulo' });
    }
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Actualizar proyecto (admin o editor)
// @route  PUT /api/proyectos/:id
// @access Admin o Editor
const actualizarProyecto = async (req, res) => {
  try {
    const proyecto = await ProyectoFinal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!proyecto) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Eliminar proyecto (solo admin)
// @route  DELETE /api/proyectos/:id
// @access Admin
const eliminarProyecto = async (req, res) => {
  try {
    const proyecto = await ProyectoFinal.findByIdAndDelete(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    res.json({ message: 'Proyecto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearProyecto,
  obtenerProyectoPorModulo,
  actualizarProyecto,
  eliminarProyecto
};
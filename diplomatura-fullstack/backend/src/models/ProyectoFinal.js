const mongoose = require('mongoose');

const proyectoFinalSchema = new mongoose.Schema({
  modulo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Modulo',
    required: [true, 'El módulo es obligatorio'],
    unique: true
  },
  titulo: {
    type: String,
    required: [true, 'El título del proyecto es obligatorio']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  requisitos: {
    type: String,
    required: [true, 'Los requisitos son obligatorios']
  },
  imagen_ejemplo: {
    type: String,
    default: ''
  },
  link_demo: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ProyectoFinal', proyectoFinalSchema);
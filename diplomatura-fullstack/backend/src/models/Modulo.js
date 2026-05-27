const mongoose = require('mongoose');

const moduloSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del módulo es obligatorio'],
    trim: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  orden: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 4
  },
  profesor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profesor',
    default: null
  },
  imagen_portada: {
    type: String,
    default: '/modulos/default.jpg'
  },
  duracion_semanas: {
    type: Number,
    default: 4
  }
}, {
  timestamps: true,
  versionKey: false
});

moduloSchema.index({ nombre: 1 });

module.exports = mongoose.model('Modulo', moduloSchema);
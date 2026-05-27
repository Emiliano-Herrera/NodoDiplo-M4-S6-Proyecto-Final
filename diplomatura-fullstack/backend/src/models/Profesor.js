const mongoose = require('mongoose');

const profesorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del profesor es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true
  },
  especialidad: {
    type: String,
    default: ''
  },
  biografia: {
    type: String,
    default: ''
  },
  modulo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Modulo',
    default: null
  },
  imagen: {
    type: String,
    default: '/profesores/default.jpg'
  }
}, {
  timestamps: true,
  versionKey: false
});

// Índice para búsquedas
profesorSchema.index({ nombre: 1 });

// Forzar el nombre de la colección (opcional, para evitar pluralización automática)
// module.exports = mongoose.model('Profesor', profesorSchema, 'profesores');

module.exports = mongoose.model('Profesor', profesorSchema);
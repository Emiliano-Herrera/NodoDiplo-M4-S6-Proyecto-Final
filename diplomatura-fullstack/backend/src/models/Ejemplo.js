const mongoose = require('mongoose');

const ejemploSchema = new mongoose.Schema({
  tema_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tema',
    required: [true, 'El tema es obligatorio']
  },
  titulo: {
    type: String,
    required: [true, 'El título del ejemplo es obligatorio'],
    trim: true
  },
  explicacion: {
    type: String,
    required: [true, 'La explicación es obligatoria']
  },
  // Código HTML (obligatorio)
  html: {
    type: String,
    required: [true, 'El código HTML es obligatorio']
  },
  // Código CSS (opcional)
  css: {
    type: String,
    default: ''
  },
  // Código JavaScript (opcional)
  javascript: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ejemplo', ejemploSchema);
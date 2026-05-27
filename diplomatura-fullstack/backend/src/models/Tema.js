const mongoose = require('mongoose');

const temaSchema = new mongoose.Schema({
  modulo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Modulo',
    required: [true, 'El módulo es obligatorio']
  },
  titulo: {
    type: String,
    required: [true, 'El título del tema es obligatorio'],
    trim: true
  },
  contenido: {
    type: String,
    required: [true, 'El contenido es obligatorio']
  },
  orden: {
    type: Number,
    required: true
  },
  video_url: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

temaSchema.index({ modulo_id: 1, orden: 1 }, { unique: true });

module.exports = mongoose.model('Tema', temaSchema);
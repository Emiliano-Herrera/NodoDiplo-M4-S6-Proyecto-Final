const mongoose = require('mongoose');

const videoEjemploSchema = new mongoose.Schema({
  ejemplo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ejemplo',
    required: true
  },
  url: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    default: ''
  },
  tipo: {
    type: String,
    enum: ['youtube', 'vimeo', 'local', 'otro'],
    default: 'otro'
  },
  orden: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('VideoEjemplo', videoEjemploSchema);
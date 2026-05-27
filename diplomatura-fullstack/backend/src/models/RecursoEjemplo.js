const mongoose = require('mongoose');

const recursoEjemploSchema = new mongoose.Schema({
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
    required: true
  },
  descripcion: {
    type: String,
    default: ''
  },
  tipo: {
    type: String,
    enum: ['documentacion', 'github', 'articulo', 'tutorial', 'herramienta', 'otro'],
    default: 'otro'
  },
  orden: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RecursoEjemplo', recursoEjemploSchema);
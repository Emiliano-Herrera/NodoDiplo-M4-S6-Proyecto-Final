const mongoose = require('mongoose');

const imagenEjemploSchema = new mongoose.Schema({
  ejemplo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ejemplo',
    required: [true, 'El ejemplo es obligatorio']
  },
  url: {
    type: String,
    required: [true, 'La URL de la imagen es obligatoria']
  },
  descripcion: {
    type: String,
    default: ''
  },
  orden: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

imagenEjemploSchema.index({ ejemplo_id: 1, orden: 1 }, { unique: true });

module.exports = mongoose.model('ImagenEjemplo', imagenEjemploSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false
  },
  rol: {
    type: String,
    enum: ['admin', 'editor', 'visitante'],
    default: 'visitante'
  },
  imagen: {
    type: String,
    default: '/usuarios/default.jpg'
  },
  activo: {
    type: Boolean,
    default: true
  },
  fecha_registro: {
    type: Date,
    default: Date.now
  }
});

// VERSIÓN MÁS SIMPLE - Sin async/await ni next
usuarioSchema.pre('save', function() {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
});

usuarioSchema.methods.compararPassword = function(passwordIngresada) {
  return bcrypt.compareSync(passwordIngresada, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// Generar JWT
const generarToken = (id, rol) => {
  return jwt.sign(
    { id, rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// @desc   Registrar usuario
// @route  POST /api/auth/registro
// @access Público
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Crear usuario (por defecto 'visitante' a menos que se especifique otro)
    const usuario = await Usuario.create({
      nombre,
      email,
      password,
      rol: rol || 'visitante'
    });

    res.status(201).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token: generarToken(usuario._id, usuario.rol)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Login usuario
// @route  POST /api/auth/login
// @access Público
const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe y traer password
    const usuario = await Usuario.findOne({ email }).select('+password');
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const passwordValida = await usuario.compararPassword(password);
    if (!passwordValida) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar si está activo
    if (!usuario.activo) {
      return res.status(401).json({ message: 'Cuenta desactivada' });
    }

    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token: generarToken(usuario._id, usuario.rol)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Obtener perfil propio
// @route  GET /api/auth/perfil
// @access Privado (cualquier usuario logueado)
const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password');
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Actualizar perfil propio
// @route  PUT /api/auth/perfil
// @access Privado
const actualizarPerfil = async (req, res) => {
  try {
    const { nombre, imagen } = req.body;
    const usuario = await Usuario.findByIdAndUpdate(
      req.usuario.id,
      { nombre, imagen },
      { new: true, runValidators: true }
    ).select('-password');
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Obtener todos los usuarios (solo admin)
// @route  GET /api/auth/usuarios
// @access Admin
const obtenerUsuarios = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    
    const query = search ? { nombre: { $regex: search, $options: 'i' } } : {};
    
    const usuarios = await Usuario.find(query)
      .select('-password')
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Usuario.countDocuments(query);
    
    res.json({
      usuarios,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Cambiar rol de usuario (solo admin)
// @route  PUT /api/auth/usuarios/:id/rol
// @access Admin
const cambiarRol = async (req, res) => {
  try {
    const { rol } = req.body;
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { rol },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Eliminar usuario (solo admin)
// @route  DELETE /api/auth/usuarios/:id
// @access Admin
const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Actualizar usuario (solo admin)
// @route  PUT /api/auth/usuarios/:id
// @access Admin
const actualizarUsuario = async (req, res) => {
  try {
    const { nombre, email, rol, password } = req.body;
    const usuario = await Usuario.findById(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (nombre) usuario.nombre = nombre;
    if (email) usuario.email = email;
    if (rol) usuario.rol = rol;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      usuario.password = await bcrypt.hash(password, salt);
    }

    await usuario.save();
    
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  obtenerPerfil,
  actualizarUsuario,
  actualizarPerfil,
  obtenerUsuarios,
  cambiarRol,
  eliminarUsuario
};
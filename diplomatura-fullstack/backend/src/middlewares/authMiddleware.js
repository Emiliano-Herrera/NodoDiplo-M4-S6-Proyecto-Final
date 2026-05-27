const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Middleware para verificar el token JWT
const protegerRuta = async (req, res, next) => {
  let token;

  // Verificar si el token está en los headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado - Token no proporcionado' });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar usuario y adjuntar a la request
    const usuario = await Usuario.findById(decoded.id).select('-password');
    if (!usuario) {
      return res.status(401).json({ message: 'No autorizado - Usuario no existe' });
    }

    if (!usuario.activo) {
      return res.status(401).json({ message: 'Cuenta desactivada' });
    }

    req.usuario = {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    };
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = { protegerRuta };
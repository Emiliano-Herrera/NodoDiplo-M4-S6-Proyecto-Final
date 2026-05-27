// Middleware para verificar roles específicos
const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    if (rolesPermitidos.includes(req.usuario.rol)) {
      next();
    } else {
      res.status(403).json({ 
        message: `Acceso denegado. Rol '${req.usuario.rol}' no tiene permisos.`,
        rolesNecesarios: rolesPermitidos
      });
    }
  };
};

// Middlewares específicos para conveniencia
const soloAdmin = verificarRol('admin');
const soloAdminOEditor = verificarRol('admin', 'editor');
const cualquierUsuario = verificarRol('admin', 'editor', 'visitante');

module.exports = {
  verificarRol,
  soloAdmin,
  soloAdminOEditor,
  cualquierUsuario
};
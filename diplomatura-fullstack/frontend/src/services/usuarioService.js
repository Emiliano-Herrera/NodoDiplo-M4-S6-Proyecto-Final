import api from './api';

// Obtener todos los usuarios (con paginación y búsqueda)
export const getUsuarios = async (page = 1, limit = 10, search = '') => {
  const response = await api.get(`/auth/usuarios?page=${page}&limit=${limit}&search=${search}`);
  return response.data;
};

// Obtener usuario por ID
export const getUsuarioById = async (id) => {
  const response = await api.get(`/auth/usuarios/${id}`);
  return response.data;
};

// Crear usuario
export const createUsuario = async (usuarioData) => {
  const response = await api.post('/auth/registro', usuarioData);
  return response.data;
};

// Actualizar usuario
export const updateUsuario = async (id, usuarioData) => {
  const response = await api.put(`/auth/usuarios/${id}`, usuarioData);
  return response.data;
};

// Cambiar rol de usuario
export const changeUserRole = async (id, rol) => {
  const response = await api.put(`/auth/usuarios/${id}/rol`, { rol });
  return response.data;
};

// Eliminar usuario
export const deleteUsuario = async (id) => {
  const response = await api.delete(`/auth/usuarios/${id}`);
  return response.data;
};
import api from './api';

// Obtener todos los módulos (con paginación y búsqueda)
export const getModulos = async (page = 1, limit = 100, search = '') => {
  const response = await api.get(`/modulos?page=${page}&limit=${limit}&search=${search}`);
  console.log("Módulos recibidos del backend:", response.data);
  return response.data;
};

// Obtener módulo por ID
export const getModuloById = async (id) => {
  const response = await api.get(`/modulos/${id}`);
  return response.data;
};

// Crear módulo
export const createModulo = async (moduloData) => {
  console.log("Creando módulo:", moduloData);
  const response = await api.post('/modulos', moduloData);
  return response.data;
};

// Actualizar módulo
export const updateModulo = async (id, moduloData) => {
  console.log(`Actualizando módulo ${id}:`, moduloData);
  const response = await api.put(`/modulos/${id}`, moduloData);
  console.log("Respuesta del backend:", response.data);
  return response.data;
};

// Eliminar módulo
export const deleteModulo = async (id) => {
  const response = await api.delete(`/modulos/${id}`);
  return response.data;
};
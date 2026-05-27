import api from './api';

// Obtener todos los profesores (con paginación y búsqueda)
export const getProfesores = async (page = 1, limit = 10, search = '') => {
  const response = await api.get(`/profesores?page=${page}&limit=${limit}&search=${search}`);
  return response.data;
};

// Obtener profesor por ID
export const getProfesorById = async (id) => {
  const response = await api.get(`/profesores/${id}`);
  return response.data;
};

// Crear profesor
export const createProfesor = async (profesorData) => {
  const response = await api.post('/profesores', profesorData);
  return response.data;
};

// Actualizar profesor
export const updateProfesor = async (id, profesorData) => {
  const response = await api.put(`/profesores/${id}`, profesorData);
  return response.data;
};

// Eliminar profesor
export const deleteProfesor = async (id) => {
  const response = await api.delete(`/profesores/${id}`);
  return response.data;
};
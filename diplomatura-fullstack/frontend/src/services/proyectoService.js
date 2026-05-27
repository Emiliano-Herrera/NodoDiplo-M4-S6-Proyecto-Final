import api from './api';

// Obtener proyecto final por módulo
export const getProyectoByModulo = async (moduloId) => {
  try {
    const response = await api.get(`/proyectos-finales/modulo/${moduloId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error('Error al obtener proyecto:', error);
    return null;
  }
};

// Crear proyecto final
export const createProyecto = async (proyectoData) => {
  const response = await api.post('/proyectos-finales', proyectoData);
  return response.data;
};

// Actualizar proyecto final
export const updateProyecto = async (id, proyectoData) => {
  const response = await api.put(`/proyectos-finales/${id}`, proyectoData);
  return response.data;
};

// Eliminar proyecto final
export const deleteProyecto = async (id) => {
  const response = await api.delete(`/proyectos-finales/${id}`);
  return response.data;
};


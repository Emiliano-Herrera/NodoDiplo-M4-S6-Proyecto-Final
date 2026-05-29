import api from './api';

// Obtener todos los temas (con paginación y búsqueda) - PARA EL DASHBOARD
export const getTemas = async (page = 1, limit = 10, search = '') => {
  try {
    const response = await api.get(`/temas?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener temas:', error);
    return { temas: [], total: 0, pages: 1 };
  }
};

// Obtener temas por módulo
export const getTemasByModulo = async (moduloId) => {
  try {
    const response = await api.get(`/temas/modulo/${moduloId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener temas por módulo:', error);
    return [];
  }
};

// Obtener tema por ID
export const getTemaById = async (id) => {
  const response = await api.get(`/temas/${id}`);
  return response.data;
};

// Crear tema
export const createTema = async (temaData) => {
  const response = await api.post('/temas', temaData);
  return response.data;
};

// Actualizar tema
export const updateTema = async (id, temaData) => {
  const response = await api.put(`/temas/${id}`, temaData);
  return response.data;
};

// Eliminar tema
export const deleteTema = async (id) => {
  const response = await api.delete(`/temas/${id}`);
  return response.data;
};

// Obtener ejemplos por tema
export const getEjemplosByTema = async (temaId) => {
  try {
    const response = await api.get(`/ejemplos/tema/${temaId}`);
    const ejemplos = response.data;
    
    for (const ejemplo of ejemplos) {
      try {
        const imagenesRes = await api.get(`/imagenes-ejemplos/ejemplo/${ejemplo._id}`);
        ejemplo.imagenes = imagenesRes.data || [];
      } catch (e) {
        ejemplo.imagenes = [];
      }
      
      try {
        const videosRes = await api.get(`/videos-ejemplo/ejemplo/${ejemplo._id}`);
        ejemplo.videos = videosRes.data || [];
      } catch (e) {
        ejemplo.videos = [];
      }
      
      try {
        const recursosRes = await api.get(`/recursos-ejemplo/ejemplo/${ejemplo._id}`);
        ejemplo.recursos = recursosRes.data || [];
      } catch (e) {
        ejemplo.recursos = [];
      }
    }
    
    return ejemplos;
  } catch (error) {
    console.error('Error al obtener ejemplos:', error);
    return [];
  }
};

// Obtener un ejemplo por ID
export const getEjemploById = async (id) => {
  try {
    const response = await api.get(`/ejemplos/${id}`);
    const ejemplo = response.data;
    
    try {
      const imagenesRes = await api.get(`/imagenes-ejemplos/ejemplo/${id}`);
      ejemplo.imagenes = imagenesRes.data || [];
    } catch (e) {
      ejemplo.imagenes = [];
    }
    
    try {
      const videosRes = await api.get(`/videos-ejemplo/ejemplo/${id}`);
      ejemplo.videos = videosRes.data || [];
    } catch (e) {
      ejemplo.videos = [];
    }
    
    try {
      const recursosRes = await api.get(`/recursos-ejemplo/ejemplo/${id}`);
      ejemplo.recursos = recursosRes.data || [];
    } catch (e) {
      ejemplo.recursos = [];
    }
    
    return ejemplo;
  } catch (error) {
    console.error('Error al obtener ejemplo:', error);
    return null;
  }
};
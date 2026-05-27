import api from './api';

// Obtener ejemplos por tema
export const getEjemplosByTema = async (temaId) => {
  try {
    const response = await api.get(`/ejemplos/tema/${temaId}`);
    const ejemplos = response.data;
    
    // Para cada ejemplo, cargar sus imágenes, videos y recursos
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

// Obtener ejemplo por ID con sus recursos
export const getEjemploById = async (id) => {
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
};

// Crear ejemplo
export const createEjemplo = async (ejemploData) => {
  const { imagenes, videos, recursos, ...ejemploBase } = ejemploData;
  
  // Crear el ejemplo base
  const response = await api.post('/ejemplos', ejemploBase);
  const nuevoEjemplo = response.data;
  
  // Crear imágenes asociadas
  if (imagenes && imagenes.length > 0) {
    for (const img of imagenes) {
      await api.post('/imagenes-ejemplos', {
        ejemplo_id: nuevoEjemplo._id,
        url: img.url,
        descripcion: img.descripcion || '',
        orden: 1
      });
    }
  }
  
  // Crear videos asociados
  if (videos && videos.length > 0) {
    for (const video of videos) {
      await api.post('/videos-ejemplo', {
        ejemplo_id: nuevoEjemplo._id,
        url: video.url,
        titulo: video.titulo || '',
        tipo: video.tipo || 'otro',
        orden: video.orden || 1
      });
    }
  }
  
  // Crear recursos asociados
  if (recursos && recursos.length > 0) {
    for (const recurso of recursos) {
      await api.post('/recursos-ejemplo', {
        ejemplo_id: nuevoEjemplo._id,
        url: recurso.url,
        titulo: recurso.titulo,
        descripcion: recurso.descripcion || '',
        tipo: recurso.tipo || 'otro',
        orden: recurso.orden || 1
      });
    }
  }
  
  nuevoEjemplo.imagenes = imagenes || [];
  nuevoEjemplo.videos = videos || [];
  nuevoEjemplo.recursos = recursos || [];
  return nuevoEjemplo;
};

// Actualizar ejemplo
export const updateEjemplo = async (id, ejemploData) => {
  const { imagenes, videos, recursos, ...ejemploBase } = ejemploData;
  
  // Actualizar el ejemplo base
  const response = await api.put(`/ejemplos/${id}`, ejemploBase);
  
  // Actualizar imágenes (eliminar y recrear)
  try {
    const imagenesActuales = await api.get(`/imagenes-ejemplos/ejemplo/${id}`);
    for (const img of imagenesActuales.data) {
      await api.delete(`/imagenes-ejemplos/${img._id}`);
    }
  } catch (e) {}
  
  if (imagenes && imagenes.length > 0) {
    for (const img of imagenes) {
      await api.post('/imagenes-ejemplos', {
        ejemplo_id: id,
        url: img.url,
        descripcion: img.descripcion || '',
        orden: 1
      });
    }
  }
  
  // Actualizar videos
  try {
    const videosActuales = await api.get(`/videos-ejemplo/ejemplo/${id}`);
    for (const video of videosActuales.data) {
      await api.delete(`/videos-ejemplo/${video._id}`);
    }
  } catch (e) {}
  
  if (videos && videos.length > 0) {
    for (const video of videos) {
      await api.post('/videos-ejemplo', {
        ejemplo_id: id,
        url: video.url,
        titulo: video.titulo || '',
        tipo: video.tipo || 'otro',
        orden: video.orden || 1
      });
    }
  }
  
  // Actualizar recursos
  try {
    const recursosActuales = await api.get(`/recursos-ejemplo/ejemplo/${id}`);
    for (const recurso of recursosActuales.data) {
      await api.delete(`/recursos-ejemplo/${recurso._id}`);
    }
  } catch (e) {}
  
  if (recursos && recursos.length > 0) {
    for (const recurso of recursos) {
      await api.post('/recursos-ejemplo', {
        ejemplo_id: id,
        url: recurso.url,
        titulo: recurso.titulo,
        descripcion: recurso.descripcion || '',
        tipo: recurso.tipo || 'otro',
        orden: recurso.orden || 1
      });
    }
  }
  
  const ejemploActualizado = response.data;
  ejemploActualizado.imagenes = imagenes || [];
  ejemploActualizado.videos = videos || [];
  ejemploActualizado.recursos = recursos || [];
  return ejemploActualizado;
};

// Eliminar ejemplo
export const deleteEjemplo = async (id) => {
  // Eliminar imágenes asociadas
  try {
    const imagenes = await api.get(`/imagenes-ejemplos/ejemplo/${id}`);
    for (const img of imagenes.data) {
      await api.delete(`/imagenes-ejemplos/${img._id}`);
    }
  } catch (e) {}
  
  // Eliminar videos asociados
  try {
    const videos = await api.get(`/videos-ejemplo/ejemplo/${id}`);
    for (const video of videos.data) {
      await api.delete(`/videos-ejemplo/${video._id}`);
    }
  } catch (e) {}
  
  // Eliminar recursos asociados
  try {
    const recursos = await api.get(`/recursos-ejemplo/ejemplo/${id}`);
    for (const recurso of recursos.data) {
      await api.delete(`/recursos-ejemplo/${recurso._id}`);
    }
  } catch (e) {}
  
  // Eliminar el ejemplo
  const response = await api.delete(`/ejemplos/${id}`);
  return response.data;
};
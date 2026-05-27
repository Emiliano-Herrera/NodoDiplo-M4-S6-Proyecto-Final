const axios = require('axios');

const API_URL = process.env.API_LENGUAJES_URL || 'https://69f58d1ffb098eb7f0b55639.mockapi.io/languages/v1/characters';

// @desc   Obtener todos los lenguajes (con paginación y búsqueda)
// @route  GET /api/lenguajes
// @access Público (visitantes)
const obtenerLenguajes = async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    let lenguajes = response.data;
    
    // Búsqueda local (por nombre)
    const search = req.query.search || '';
    if (search) {
      lenguajes = lenguajes.filter(l => 
        l.name?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Paginación
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    
    const paginatedResults = lenguajes.slice(start, end);
    const total = lenguajes.length;
    
    res.json({
      lenguajes: paginatedResults,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener lenguajes', error: error.message });
  }
};

// @desc   Obtener lenguaje por ID
// @route  GET /api/lenguajes/:id
// @access Público
const obtenerLenguajeById = async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Lenguaje no encontrado', error: error.message });
  }
};

module.exports = {
  obtenerLenguajes,
  obtenerLenguajeById
};
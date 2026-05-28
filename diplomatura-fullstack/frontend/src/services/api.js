import axios from 'axios';

// ⚠️ CRUCIAL: Usar la URL de tu backend en Render
// Esta es la URL que te dio Render para tu Web Service
const API_URL = 'https://diplomatura-backend-u85h.onrender.com';

console.log('🔧 API_URL configurada:', API_URL); // Para verificar

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para agregar el token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`📡 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error:', error.config?.url, error.message);
    return Promise.reject(error);
  }
);

export default api;
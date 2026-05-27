import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const registro = async (nombre, email, password) => {
  const response = await axios.post(`${API_URL}/auth/registro`, { nombre, email, password });
  return response.data;
};

export const verificarToken = async (token) => {
  const response = await axios.get(`${API_URL}/auth/perfil`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: [
    'https://diplomatura-frontend.onrender.com',  // Tu frontend en Render
    /* 'http://localhost:3000' */                       // Desarrollo local
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// RUTAS CORREGIDAS (sin /api)
app.use('/auth', require('./routes/authRoutes'));
app.use('/profesores', require('./routes/profesorRoutes'));
app.use('/modulos', require('./routes/moduloRoutes'));
app.use('/temas', require('./routes/temaRoutes'));
app.use('/ejemplos', require('./routes/ejemploRoutes'));
app.use('/proyectos-finales', require('./routes/proyectoRoutes'));
app.use('/lenguajes', require('./routes/lenguajeRoutes'));
// Rutas de ejemplos y recursos multimedia
app.use('/imagenes-ejemplos', require('./routes/imagenEjemploRoutes'));
app.use('/videos-ejemplo', require('./routes/videoEjemploRoutes'));
app.use('/recursos-ejemplo', require('./routes/recursoEjemploRoutes'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'Diplomatura Full-Stack funcionando 🚀',
    endpoints: {
      auth: '/auth',
      profesores: '/profesores',
      modulos: '/modulos',
      temas: '/temas',
      ejemplos: '/ejemplos',
      proyectos: '/proyectos-finales',
      lenguajes: '/lenguajes'
    }
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ message: `Ruta ${req.originalUrl} no encontrada` });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
const mongoose = require('mongoose');
require('dotenv').config();

const Usuario = require('./src/models/Usuario');
const Profesor = require('./src/models/Profesor');
const Modulo = require('./src/models/Modulo');
const Tema = require('./src/models/Tema');
const Ejemplo = require('./src/models/Ejemplo');
const ProyectoFinal = require('./src/models/ProyectoFinal');
const ImagenEjemplo = require('./src/models/ImagenEjemplo');

async function testAllModels() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    // 1. Crear Usuario
    await Usuario.deleteMany({ email: 'admin@test.com' });
    const usuario = await Usuario.create({
      nombre: 'Admin Test',
      email: 'admin@test.com',
      password: '123456',
      rol: 'admin'
    });
    console.log('✅ Usuario creado:', usuario.nombre);

    // 2. Crear Profesor
    await Profesor.deleteMany({ email: 'profesor@test.com' });
    const profesor = await Profesor.create({
      nombre: 'Juan Pérez',
      email: 'profesor@test.com',
      biografia: 'Experto en desarrollo web',
      especialidad: 'Full Stack'
    });
    console.log('✅ Profesor creado:', profesor.nombre);

    // 3. Crear Módulo
    await Modulo.deleteMany({ orden: 1 });
    const modulo = await Modulo.create({
      nombre: 'Diseño Web',
      descripcion: 'Aprende HTML, CSS y diseño responsive',
      orden: 1,
      profesor_id: profesor._id,
      duracion_semanas: 4
    });
    console.log('✅ Módulo creado:', modulo.nombre);

    // 4. Crear Tema
    const tema = await Tema.create({
      modulo_id: modulo._id,
      titulo: 'Introducción a CSS',
      contenido: 'Conceptos básicos de CSS...',
      orden: 1
    });
    console.log('✅ Tema creado:', tema.titulo);

    // 5. Crear Ejemplo
    const ejemplo = await Ejemplo.create({
      tema_id: tema._id,
      titulo: 'Mi primer estilo CSS',
      codigo: 'body { background: blue; }',
      explicacion: 'Este código pone fondo azul'
    });
    console.log('✅ Ejemplo creado:', ejemplo.titulo);

    // 6. Crear Imagen del Ejemplo
    const imagen = await ImagenEjemplo.create({
      ejemplo_id: ejemplo._id,
      url: '/ejemplos/css-basico.jpg',
      descripcion: 'Captura del resultado',
      orden: 1
    });
    console.log('✅ Imagen de ejemplo creada');

    // 7. Crear Proyecto Final
    const proyecto = await ProyectoFinal.create({
      modulo_id: modulo._id,
      titulo: 'Portafolio Personal',
      descripcion: 'Crear un portafolio responsive',
      requisitos: 'HTML, CSS, Flexbox, Grid'
    });
    console.log('✅ Proyecto final creado:', proyecto.titulo);

    console.log('\n📊 Resumen:');
    console.log(`   Usuarios: ${await Usuario.countDocuments()}`);
    console.log(`   Profesores: ${await Profesor.countDocuments()}`);
    console.log(`   Módulos: ${await Modulo.countDocuments()}`);
    console.log(`   Temas: ${await Tema.countDocuments()}`);
    console.log(`   Ejemplos: ${await Ejemplo.countDocuments()}`);
    console.log(`   Imágenes: ${await ImagenEjemplo.countDocuments()}`);
    console.log(`   Proyectos: ${await ProyectoFinal.countDocuments()}`);

    console.log('\n✅ Todos los modelos funcionan correctamente!');
    
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) console.error('Detalles:', error.stack);
    await mongoose.disconnect();
  }
}

testAllModels();
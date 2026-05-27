// backend/test-models.js
const mongoose = require('mongoose');
require('dotenv').config();

const Usuario = require('./src/models/Usuario');

async function test() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');
    
    await Usuario.deleteMany({ email: 'admin@test.com' });
    console.log('🗑️ Eliminado usuarios existentes');
    
    const user = new Usuario({
      nombre: 'Admin Test',
      email: 'admin@test.com',
      password: '123456',
      rol: 'admin'
    });
    
    await user.save();
    console.log('✅ Usuario creado:', user.nombre);
    console.log('   Email:', user.email);
    console.log('   Rol:', user.rol);
    
    const encontrado = await Usuario.findOne({ email: 'admin@test.com' }).select('+password');
    console.log('✅ Usuario encontrado');
    
    await mongoose.disconnect();
    console.log('✅ Prueba completada');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
  }
}

test();
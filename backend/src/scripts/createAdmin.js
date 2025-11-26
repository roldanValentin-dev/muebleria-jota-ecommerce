import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Buscar usuario por email
    const user = await User.findOne({ email: 'admin@gmail.com' });

    if (!user) {
      console.log(' Usuario no encontrado. Primero regístrate con ese email.');
      process.exit(1);
    }

    if (user.rol === 'admin') {
      console.log('El usuario ya es admin');
      process.exit(0);
    }

    // Promover a admin
    user.rol = 'admin';
    await user.save();

    console.log('Usuario promovido a admin exitosamente');
    console.log(` Email: ${user.email}`);
    console.log(`Nombre: ${user.nombre}`);
    console.log(`Rol: ${user.rol}`);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();

import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';

export const updateProfile = async (req, res, next) => {
  try {
    const { nombre, email } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'El email ya está en uso' });
      }
      user.email = email;
    }

    if (nombre) {
      user.nombre = nombre;
    }

    await user.save();

    res.json({
      id: user._id,
      nombre: user.nombre,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { passwordActual, passwordNueva } = req.body;

    if (!passwordActual || !passwordNueva) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await user.comparePassword(passwordActual);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña actual incorrecta' });
    }

    if (passwordNueva.length < 6) {
      return res.status(400).json({ message: 'La nueva contraseña debe tener al menos 6 caracteres' });
    }

    user.password = passwordNueva;
    await user.save();

    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    next(error);
  }
};

import User from '../models/User.model.js';

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.rol !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar permisos' });
  }
};

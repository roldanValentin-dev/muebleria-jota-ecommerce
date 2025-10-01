// backend/src/middlewares/errorHandlers.js

// Middleware para rutas no encontradas (404)
export const notFound = (req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
};

// Middleware para manejo de errores centralizado
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Ocurrió un error interno';
  res.status(status).json({ message });
};
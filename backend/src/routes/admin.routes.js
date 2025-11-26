import express from 'express';
import {
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  getStats
} from '../controllers/admin.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';

const router = express.Router();

// Todas las rutas requieren autenticación y rol admin
router.use(authMiddleware);
router.use(isAdmin);

// Estadísticas
router.get('/stats', getStats);

// Productos
router.get('/productos', getAllProductsAdmin);
router.post('/productos', createProduct);
router.put('/productos/:id', updateProduct);
router.delete('/productos/:id', deleteProduct);

// Pedidos
router.get('/pedidos', getAllOrders);
router.patch('/pedidos/:id/estado', updateOrderStatus);

export default router;

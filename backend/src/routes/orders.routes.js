import { Router } from 'express';
import { createOrder, getMyOrders, getOrderById, cancelOrder, deleteOrder } from '../controllers/orders.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', createOrder);
router.get('/', getMyOrders);
router.get('/:id', getOrderById);
router.patch('/:id/cancelar', cancelOrder);
router.delete('/:id', deleteOrder);

export default router;
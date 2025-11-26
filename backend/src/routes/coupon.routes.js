import express from 'express';
import { validarCupon, aplicarCupon, obtenerCupones, crearCupon } from '../controllers/coupon.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/validar', validarCupon);
router.post('/aplicar', authMiddleware, aplicarCupon);
router.get('/', obtenerCupones);
router.post('/', authMiddleware, crearCupon);

export default router;

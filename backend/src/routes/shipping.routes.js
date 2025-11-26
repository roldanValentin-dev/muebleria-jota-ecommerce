import express from 'express';
import { obtenerTarifas, calcularEnvio, crearTarifa } from '../controllers/shipping.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', obtenerTarifas);
router.post('/calcular', calcularEnvio);
router.post('/', authMiddleware, crearTarifa);

export default router;

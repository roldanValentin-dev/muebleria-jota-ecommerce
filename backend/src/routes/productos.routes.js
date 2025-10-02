import { Router } from 'express';
// ¡Importamos las funciones desde nuestro controlador!
import {getAllProducts, getProductById} from '../controllers/productos.controller.js';

const router = Router();

router.get('/',getAllProducts);

router.get('/:id',getProductById);

export default router;
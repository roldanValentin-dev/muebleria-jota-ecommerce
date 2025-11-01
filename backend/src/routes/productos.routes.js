import { Router } from 'express';
// ¡Importamos las funciones desde nuestro controlador!
import {getAllProducts, getProductById,createProduct,updateProduct,deleteProduct} from '../controllers/productos.controller.js';

const router = Router();

router.get('/',getAllProducts);

router.get('/:id',getProductById);

router.post('/',createProduct);

router.put('/:id',updateProduct);

router.delete('/:id',deleteProduct);

export default router;
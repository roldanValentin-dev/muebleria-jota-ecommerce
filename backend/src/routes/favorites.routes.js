import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favorites.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:productoId', removeFavorite);

export default router;

import express from 'express';
import { updateProfile, changePassword } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.put('/perfil', updateProfile);
router.put('/cambiar-password', changePassword);

export default router;

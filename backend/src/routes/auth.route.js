// src/routes/auth.route.js
import express from 'express';
import { 
  register, 
  login, 
  logout,
  getCurrentUser 
} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', protect, logout);
router.get('/me', protect, getCurrentUser);

export default router;
// src/routes/shortUrl.route.js

import express from 'express';
import { 
  createShortUrl,
  getUserUrls        // ← new
} from '../controllers/shortUrl.controller.js';
import { 
  protect, 
  attachUser 
} from '../middlewares/auth.middleware.js';

const router = express.Router();

// POST /api/create → guests allowed, logged in users get credit
router.post('/', attachUser, createShortUrl);

// GET /api/create/my-urls → must be logged in
router.get('/my-urls', protect, getUserUrls);

export default router;
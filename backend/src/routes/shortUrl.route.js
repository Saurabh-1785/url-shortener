// src/routes/shortUrl.route.js
import express from 'express';
import { createShortUrl } from '../controllers/shortUrl.controller.js';

const router = express.Router();

// POST /  → becomes POST /api/create (prefix added in app.js)
router.post('/', createShortUrl);

export default router;
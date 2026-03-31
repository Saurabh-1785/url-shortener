// src/routes/redirect.route.js
import express from 'express';
import { redirectToFullUrl } from '../controllers/shortUrl.controller.js';

const router = express.Router();

// GET /:id  → becomes GET /:id (prefix added in app.js)
router.get('/:id', redirectToFullUrl);

export default router;
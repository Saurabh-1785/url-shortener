// src/controllers/shortUrl.controller.js
import { createShortUrlService } from '../services/shortUrl.service.js';
import { findByShortUrl, incrementClicks } from '../dao/shortUrl.dao.js';

// POST /api/create
export const createShortUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'URL is required'
      });
    }
    
    const userId = req.user?._id || null; // if logged in
    const result = await createShortUrlService(url, userId);

    res.status(201).json({
      success: true,
      shortUrl: `${process.env.APP_URL}/${result.shortUrl}`,
      data: result
    });
  } catch (error) {
    next(error); // passes to error handler middleware
  }
};

// GET /:id  → Redirect
export const redirectToFullUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Find the URL
    const urlDoc = await findByShortUrl(id);
    
    if (!urlDoc) {
      return res.status(404).json({
        success: false,
        message: 'Short URL not found'
      });
    }
    
    // Increment click count
    await incrementClicks(id);
    
    // Redirect to full URL
    res.redirect(urlDoc.fullUrl);
  } catch (error) {
    next(error);
  }
};
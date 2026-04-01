// src/controllers/shortUrl.controller.js
import wrapAsync from '../utils/wrapAsync.js';
import { NotFoundError, BadRequestError } from '../middlewares/errorHandler.js';
import { createShortUrlService } from '../services/shortUrl.service.js';
import { findByShortUrl, incrementClicks } from '../dao/shortUrl.dao.js';

// No try/catch needed anymore! wrapAsync handles it
export const createShortUrl = wrapAsync(async (req, res, next) => {
  const { url } = req.body;

  if (!url) {
    throw new BadRequestError('URL is required');
    // ↑ wrapAsync catches this and calls next(error)
  }

  const userId = req.user?._id || null;
  const result = await createShortUrlService(url, userId);

  res.status(201).json({
    success: true,
    shortUrl: `${process.env.APP_URL}/${result.shortUrl}`,
    data: result
  });
});

export const redirectToFullUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;

  const urlDoc = await findByShortUrl(id);

  if (!urlDoc) {
    throw new NotFoundError('Short URL not found');
  }

  await incrementClicks(id);

  res.redirect(urlDoc.fullUrl);
});
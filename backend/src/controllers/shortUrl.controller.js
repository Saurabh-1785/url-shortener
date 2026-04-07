// src/controllers/shortUrl.controller.js
import wrapAsync from '../utils/wrapAsync.js';
import { NotFoundError, BadRequestError } from '../middlewares/errorHandler.js';
import { createShortUrlService } from '../services/shortUrl.service.js';
import { findByShortUrl, incrementClicks } from '../dao/shortUrl.dao.js';

export const createShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;
  //           ↑
  //    NEW: extract slug from body

  if (!url) {
    throw new BadRequestError('URL is required');
  }

  // Basic slug validation
  if (slug) {
    // Only allow letters, numbers, hyphens
    const slugRegex = /^[a-zA-Z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      throw new BadRequestError(
        'Slug can only contain letters, numbers, and hyphens'
      );
    }
    // Minimum length
    if (slug.length < 3) {
      throw new BadRequestError(
        'Slug must be at least 3 characters'
      );
    }
  }

  const userId = req.user?._id || null;

  // Pass slug to service
  const result = await createShortUrlService(url, userId, slug || null);

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

export const getUserUrls = wrapAsync(async (req, res) => {
  const urls = await getUrlsByUserId(req.user._id);
  //                                  ↑
  //                    req.user set by protect middleware

  res.status(200).json({
    success: true,
    count: urls.length,
    urls
  });
});
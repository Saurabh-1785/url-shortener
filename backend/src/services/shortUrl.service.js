// src/services/shortUrl.service.js

import { generateNanoId } from '../utils/helper.js';
import { 
  saveShortUrl, 
  findByShortUrl,
  findByCustomSlug 
} from '../dao/shortUrl.dao.js';
import { ConflictError, UnauthorizedError } from '../middlewares/errorHandler.js';

export const createShortUrlService = async (fullUrl, userId = null, slug = null) => {
  
  // CASE 1: User provided a custom slug
  if (slug) {
    // Custom slugs only for logged in users
    if (!userId) {
      throw new UnauthorizedError(
        'Please login to use custom slugs'
      );
    }

    // Check if slug already taken
    const slugExists = await findByCustomSlug(slug);
    if (slugExists) {
      throw new ConflictError(
        `"${slug}" is already taken. Please choose another.`
      );
    }

    // Slug is available → save with custom slug
    const saved = await saveShortUrl(slug, fullUrl, userId);
    return saved;
  }

  // CASE 2: No slug provided → generate random nanoid
  const shortUrl = generateNanoId(7);

  // Extremely rare but check collision anyway
  const exists = await findByShortUrl(shortUrl);
  if (exists) {
    // Retry with new random ID
    return createShortUrlService(fullUrl, userId, null);
  }

  const saved = await saveShortUrl(shortUrl, fullUrl, userId);
  return saved;
};
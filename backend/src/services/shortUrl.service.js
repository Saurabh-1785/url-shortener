// src/services/shortUrl.service.js (updated)
import { generateNanoId } from '../utils/helper.js';
import { saveShortUrl, findByShortUrl } from '../dao/shortUrl.dao.js';
import { ConflictError } from '../middlewares/errorHandler.js';

export const createShortUrlService = async (fullUrl, userId = null) => {
  const shortUrl = generateNanoId(7);

  const exists = await findByShortUrl(shortUrl);
  if (exists) {
    // Retry logic - recursively generate new ID
    return createShortUrlService(fullUrl, userId);
  }

  const saved = await saveShortUrl(shortUrl, fullUrl, userId);

  if (!saved) {
    throw new AppError('Failed to save URL', 500);
  }

  return saved;
};
// src/services/shortUrl.service.js
import { generateNanoId } from '../utils/helper.js';
import { 
  saveShortUrl, 
  findByShortUrl 
} from '../dao/shortUrl.dao.js';

export const createShortUrlService = async (fullUrl, userId = null) => {
  // Generate unique short URL
  const shortUrl = generateNanoId(7);
  
  // Check if somehow it already exists (extremely rare)
  const exists = await findByShortUrl(shortUrl);
  if (exists) {
    // Retry with new ID (retry logic)
    return createShortUrlService(fullUrl, userId);
  }
  
  // Save to database via DAO
  const saved = await saveShortUrl(shortUrl, fullUrl, userId);
  
  return saved;
};
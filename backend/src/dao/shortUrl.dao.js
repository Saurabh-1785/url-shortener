// src/dao/shortUrl.dao.js
import ShortUrl from '../models/shortUrl.model.js';

// Save a new short URL to database
export const saveShortUrl = async (shortUrl, fullUrl, userId = null) => {
  const newUrl = new ShortUrl({
    shortUrl,
    fullUrl,
    ...(userId && { user: userId }), // only add if exists
  });
  return await newUrl.save();
};

// Find a document by its short URL string
export const findByShortUrl = async (shortUrl) => {
  return await ShortUrl.findOne({ shortUrl });
};

// Increment click count by 1
export const incrementClicks = async (shortUrl) => {
  return await ShortUrl.findOneAndUpdate(
    { shortUrl },
    { $inc: { clicks: 1 } },
    { new: true }           // returns updated document
  );
};

// Get all URLs created by a specific user
export const getUrlsByUserId = async (userId) => {
  return await ShortUrl.find({ user: userId });
};
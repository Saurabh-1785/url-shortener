// src/models/shortUrl.model.js
import mongoose from 'mongoose';

const shortUrlSchema = new mongoose.Schema(
  {
    fullUrl: {
      type: String,
      required: [true, 'Full URL is required'],
    },
    shortUrl: {
      type: String,
      required: [true, 'Short URL is required'],
      unique: true,
      index: true,        // ← Critical for performance
    },
    clicks: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',        // ← Reference to User model
      required: false,    // ← Guest users can also shorten
    },
  },
  { 
    timestamps: true      // ← Adds createdAt, updatedAt
  }
);

export default mongoose.model('ShortUrl', shortUrlSchema);
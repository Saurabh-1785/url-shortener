// src/utils/token.js
import jwt from 'jsonwebtoken';

// Cookie configuration
export const cookieOptions = {
  httpOnly: true,      // JS cannot access
  secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
  sameSite: 'lax',     // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};

// Create JWT token with user ID as payload
export const signToken = (userId) => {
  return jwt.sign(
    { id: userId },             // payload
    process.env.JWT_SECRET,     // secret key
    { expiresIn: '7d' }         // expiry
  );
};

// Verify incoming token
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
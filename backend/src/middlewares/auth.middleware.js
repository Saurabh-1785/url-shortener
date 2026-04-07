// src/middlewares/auth.middleware.js
import { verifyToken } from '../utils/token.js';
import { findUserById } from '../dao/user.dao.js';
import { UnauthorizedError } from '../middlewares/errorHandler.js';

// PROTECT routes - user MUST be logged in
export const protect = async (req, res, next) => {
  try {
    // Read token from cookie
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new UnauthorizedError('Please login to access this');
    }

    // Verify token is valid and not expired
    const decoded = verifyToken(token);

    // Check user still exists in DB
    const user = await findUserById(decoded.id);
    if (!user) {
      throw new UnauthorizedError('User no longer exists');
    }

    // Attach user to request for next middleware
    req.user = user;
    next();

  } catch (error) {
    next(error);
  }
};

// OPTIONAL auth - attach user if logged in but don't block
export const attachUser = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) return next(); // no token? just continue

    const decoded = verifyToken(token);
    const user = await findUserById(decoded.id);
    req.user = user || null;

  } catch (error) {
    req.user = null; // invalid token? just set null, don't block
  }
  next();
};
// src/middlewares/errorHandler.js

// Custom Error Class
// Extends built-in Error to add statusCode and isOperational
export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);           // calls Error constructor
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    // Captures where error occurred in stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

// Pre-built common errors
// Instead of remembering status codes everywhere
export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(message, 401);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}

// src/middlewares/errorHandler.js (continued)

export const globalErrorHandler = (err, req, res, next) => {
  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle MongoDB duplicate key error
  // Example: same shortUrl already exists
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  // Handle MongoDB validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map(e => e.message)
      .join(', ');
  }

  // Handle JWT errors (Phase 6)
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please login again';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired. Please login again';
  }

  // Development: show full error details
  // Production: show clean message only
  const response = {
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,       // helps debugging
      error: err
    })
  };

  res.status(statusCode).json(response);
};
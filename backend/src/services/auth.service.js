// src/services/auth.service.js
import { 
  findUserByEmail,
  findUserByEmailWithPassword,
  createUser 
} from '../dao/user.dao.js';
import { ConflictError, UnauthorizedError } from '../middlewares/errorHandler.js';

export const registerService = async (name, email, password) => {
  // Check if email already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new ConflictError('Email already registered');
  }

  // Create user (password gets hashed in model)
  const user = await createUser(name, email, password);
  return user;
};

export const loginService = async (email, password) => {
  // Get user WITH password for comparison
  const user = await findUserByEmailWithPassword(email);

  // Don't reveal whether email exists or password wrong
  // Always say "Invalid credentials" for security
  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid credentials');
  }

  return user;
};
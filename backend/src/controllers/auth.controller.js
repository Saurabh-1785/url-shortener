// src/controllers/auth.controller.js
import wrapAsync from '../utils/wrapAsync.js';
import { registerService, loginService } from '../services/auth.service.js';
import { signToken, cookieOptions } from '../utils/token.js';

export const register = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await registerService(name, email, password);
  const token = signToken(user._id);

  // Remove password from response
  user.password = undefined;

  // Set token as HttpOnly cookie
  res.cookie('accessToken', token, cookieOptions);

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    user,
  });
});

export const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await loginService(email, password);
  const token = signToken(user._id);

  // Remove password from response
  user.password = undefined;

  // Set token as HttpOnly cookie
  res.cookie('accessToken', token, cookieOptions);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    user,
  });
});

export const logout = wrapAsync(async (req, res) => {
  // Clear the cookie
  res.clearCookie('accessToken', cookieOptions);

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

export const getCurrentUser = wrapAsync(async (req, res) => {
  // req.user set by auth middleware
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
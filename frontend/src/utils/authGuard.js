// src/utils/authGuard.js
import { redirect } from '@tanstack/react-router';
import store from '../store/store.js';
import { getCurrentUserApi } from '../api/auth.api.js';
import { loginSuccess } from '../store/slices/authSlice.js';

// Runs BEFORE dashboard loads
// Checks if user is authenticated
export const requireAuth = async () => {
  // First check Redux store (fast, in-memory)
  const { isAuthenticated } = store.getState().auth;
  if (isAuthenticated) return null; // already logged in

  // Store says not authenticated
  // But maybe user just refreshed page?
  // Redux resets on refresh, but cookie still exists
  // So let's verify with backend
  try {
    const data = await getCurrentUserApi();
    // Cookie was valid → backend returned user
    // Update Redux with this user
    store.dispatch(loginSuccess(data.user));
    return null; // allow access

  } catch {
    // Cookie invalid or expired
    // Redirect to auth page
    throw redirect({ to: '/auth' }); // block access
  }
};
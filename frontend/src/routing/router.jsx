// src/routing/router.jsx
import { 
  createRouter, 
  createRoute, 
  createRootRoute 
} from '@tanstack/react-router';
import RootLayout from '../pages/RootLayout.jsx';
import HomePage from '../pages/HomePage.jsx';
import AuthPage from '../pages/AuthPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import { requireAuth } from '../utils/authGuard.js';

// 1. Root route → has RootLayout (Navbar)
const rootRoute = createRootRoute({
  component: RootLayout,
});

// 2. Home page → public
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

// 3. Auth page → public
// But redirect to dashboard if already logged in
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  beforeLoad: async () => {
    // If already logged in, no need for auth page
    const { isAuthenticated } = store.getState().auth;
    if (isAuthenticated) {
      throw redirect({ to: '/dashboard' });
    }
  },
  component: AuthPage,
});

// 4. Dashboard → PROTECTED
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: requireAuth, // ← runs before page loads
  component: DashboardPage,
});

// 5. Build route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  authRoute,
  dashboardRoute,
]);

// 6. Create router
export const router = createRouter({ routeTree });
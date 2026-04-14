// src/pages/RootLayout.jsx
import { Outlet, Link } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from '../store/slices/authSlice.js';
import { logoutApi } from '../api/auth.api.js';

const RootLayout = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logoutSuccess());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar - stays mounted on all pages */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">

          {/* Brand */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            ✂️ Shortify
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-600 text-sm">
                  Hey, {user?.name}! 👋
                </span>
                <Link
                  to="/dashboard"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  My URLs
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm bg-red-500 text-white 
                             px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="text-sm bg-blue-600 text-white 
                           px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Login / Register
              </Link>
            )}
          </div>

        </div>
      </nav>

      {/* Page content renders here */}
      {/* Outlet = placeholder for child routes */}
      <Outlet />

    </div>
  );
};

export default RootLayout;
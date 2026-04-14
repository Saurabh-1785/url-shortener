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
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-indigo-600 hover:text-indigo-700 transition">
            Shortify
          </Link>

          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <div className="hidden sm:block text-sm font-medium text-gray-700">
                  Welcome, <span className="font-semibold text-gray-900">{user?.name}</span>
                </div>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium bg-white border border-gray-300 text-gray-700 
                             px-4 py-2 rounded-xl hover:bg-gray-50 hover:text-red-600 transition-all shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="text-sm font-medium bg-indigo-600 text-white 
                           px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
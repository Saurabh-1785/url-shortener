// src/pages/HomePage.jsx
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex 
                    flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          URL Shortener
        </h1>
        <p className="text-gray-500 mb-6">
          Shorten your long URLs instantly
        </p>
        {/* UrlForm component goes here - Phase 11 */}
        <p className="text-center text-gray-400 mt-4 text-sm">
          Form coming soon...
        </p>
      </div>
    </div>
  );
};

export default HomePage;
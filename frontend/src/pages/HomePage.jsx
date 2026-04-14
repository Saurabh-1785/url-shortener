// src/pages/HomePage.jsx
import { Link } from '@tanstack/react-router';

const HomePage = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden bg-gray-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-indigo-200/40 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
      
      <div className="z-10 text-center px-4 max-w-2xl mx-auto mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
          The ultimate <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">URL Shortener</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
          Transform your long, complex links into clean, memorable, and trackable URLs in seconds.
        </p>
        <Link 
          to="/auth" 
          className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-lg shadow-indigo-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          Get Started
        </Link>
      </div>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-xl shadow-gray-200/50">
        <div className="space-y-4">
          <div className="h-12 bg-gray-100 rounded-xl relative overflow-hidden flex items-center px-4 shadow-inner">
            <div className="w-4 h-4 rounded-full bg-gray-300 mr-3"></div>
            <div className="h-2 bg-gray-200 rounded text-transparent w-full">...</div>
          </div>
          <div className="flex justify-center">
             <div className="h-10 w-32 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-200 text-sm mt-2">
                Shortening...
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
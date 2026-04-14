// src/pages/DashboardPage.jsx
import UrlForm from '../components/UrlForm.jsx';
import UserUrls from '../components/UserUrls.jsx';

const DashboardPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50/50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Create new URL */}
          <div className="w-full md:w-1/3 md:sticky md:top-24 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">
              Shorten URL
            </h2>
            <UrlForm />
          </div>

          {/* User's URL list */}
          <div className="w-full md:w-2/3 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8 min-h-[600px]">
            <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">
              Your Links
            </h2>
            <UserUrls />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
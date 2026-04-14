// src/pages/DashboardPage.jsx (updated)
import UrlForm from '../components/UrlForm.jsx';
import UserUrls from '../components/UserUrls.jsx';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Create new URL */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Create New Short URL
          </h2>
          <UrlForm />
        </div>

        {/* User's URL list */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            My URLs
          </h2>
          <UserUrls />
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
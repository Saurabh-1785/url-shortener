// src/components/UserUrls.jsx
import { useQuery } from '@tanstack/react-query';
import { getMyUrlsApi } from '../api/shortUrl.api.js';

const UserUrls = () => {

    // useQuery → for GET operations (fetching data)
    const {
        data,       // the actual data
        isLoading,  // true while first fetch happening
        isError,    // true if request failed
        error       // the error object
    } = useQuery({
        queryKey: ['my-urls'],  // unique key for this data
        queryFn: getMyUrlsApi,  // function that fetches data
        staleTime: 30000,       // consider data fresh for 30 seconds
        // ↑ won't refetch if data is less than 30s old
    });

    // Loading state
    if (isLoading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map(i => (
                    <div key={i}
                        className="h-16 bg-gray-200 rounded-lg animate-pulse" />
                ))}
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 
                      rounded-lg text-red-600">
                Failed to load URLs: {error.message}
            </div>
        );
    }

    const urls = data?.urls || [];

    // Empty state
    if (urls.length === 0) {
        return (
            <div className="text-center py-12 text-gray-400">
                <p className="text-4xl mb-2">✂️</p>
                <p>No URLs yet. Create your first one!</p>
            </div>
        );
    }

    // Data state
    return (
        <div className="space-y-3">
            {urls.map((urlDoc) => (
                <UrlCard key={urlDoc._id} urlDoc={urlDoc} />
            ))}
        </div>
    );
};

// Separate component for each URL card
const UrlCard = ({ urlDoc }) => {
    const [copied, setCopied] = useState(false);
    const shortUrl = `http://localhost:3000/${urlDoc.shortUrl}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 
                    flex items-center justify-between gap-4">

            {/* URL Info */}
            <div className="flex-1 min-w-0">
                {/* Full URL */}
                <p className="text-sm text-gray-500 truncate">
                    {urlDoc.fullUrl}
                </p>
                {/* Short URL */}
                <a
                    href={shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-medium text-sm hover:underline"
                >
                    {shortUrl}
                </a>
            </div>

            {/* Stats */}
            <div className="text-center px-4 border-l border-gray-100">
                <p className="text-xl font-bold text-gray-800">
                    {urlDoc.clicks}
                </p>
                <p className="text-xs text-gray-400">clicks</p>
            </div>

            {/* Copy Button */}
            <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-lg text-sm font-medium
                    transition-colors ${copied
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
            >
                {copied ? 'Copied! ✅' : 'Copy'}
            </button>

        </div>
    );
};

export default UserUrls;
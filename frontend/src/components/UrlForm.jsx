// src/components/UrlForm.jsx
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { createShortUrlApi } from '../api/shortUrl.api.js';

const UrlForm = () => {
  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [result, setResult] = useState(null);

  const { isAuthenticated } = useSelector(state => state.auth);
  const queryClient = useQueryClient();

  // useMutation → for POST/PUT/DELETE operations
  // (creating, updating, deleting data)
  const { mutate, isPending, error } = useMutation({
    
    // The actual API call
    mutationFn: () => createShortUrlApi(url, slug || null),
    
    // Runs when API call SUCCEEDS
    onSuccess: (data) => {
      setResult(data.shortUrl);
      setUrl('');
      setSlug('');

      // 🔑 THE KEY MOMENT
      // Tell TanStack Query: "my-urls data is now outdated"
      // It will automatically refetch the URL list
      queryClient.invalidateQueries({ queryKey: ['my-urls'] });
    },

    // Runs when API call FAILS
    onError: (error) => {
      console.error('Failed to create URL:', error.message);
    }
  });

  const handleCreate = () => {
    if (!url.trim()) return;
    mutate(); // triggers mutationFn
  };

  return (
    <div className="space-y-4">

      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Long URL
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://very-long-url.com/..."
          className="w-full px-4 py-3 border border-gray-300 
                     rounded-lg focus:outline-none focus:ring-2 
                     focus:ring-blue-500"
        />
      </div>

      {/* Custom Slug (only for logged in users) */}
      {isAuthenticated && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Slug 
            <span className="text-gray-400 font-normal ml-1">
              (optional)
            </span>
          </label>
          <div className="flex items-center">
            <span className="px-3 py-3 bg-gray-100 border border-r-0 
                            border-gray-300 rounded-l-lg text-gray-500 text-sm">
              short.ly/
            </span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="my-custom-url"
              className="flex-1 px-4 py-3 border border-gray-300 
                         rounded-r-lg focus:outline-none focus:ring-2 
                         focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleCreate}
        disabled={isPending || !url.trim()}
        className="w-full py-3 bg-blue-600 text-white font-semibold 
                   rounded-lg hover:bg-blue-700 disabled:opacity-50 
                   disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'Shortening...' : 'Shorten URL ✂️'}
      </button>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 
                        rounded-lg text-red-600 text-sm">
          {error.message}
        </div>
      )}

      {/* Success Result */}
      {result && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-600 font-medium mb-2">
            ✅ URL Shortened!
          </p>
          <div className="flex items-center gap-2">
            <span className="flex-1 text-blue-600 text-sm font-mono 
                             truncate">
              {result}
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="px-3 py-1 bg-blue-600 text-white text-sm 
                         rounded hover:bg-blue-700"
            >
              Copy
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default UrlForm;
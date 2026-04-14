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

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => createShortUrlApi(url, slug || null),
    onSuccess: (data) => {
      setResult(data.shortUrl);
      setUrl('');
      setSlug('');
      queryClient.invalidateQueries({ queryKey: ['my-urls'] });
    },
    onError: (error) => {
      console.error('Failed to create URL:', error.message);
    }
  });

  const handleCreate = () => {
    if (!url.trim()) return;
    mutate();
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Destination URL
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://long-url.com/something"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 
                     rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />
      </div>

      {isAuthenticated && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center justify-between">
            <span>Custom back-half</span>
            <span className="text-gray-400 text-xs font-normal">Optional</span>
          </label>
          <div className="flex items-stretch rounded-xl shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 overflow-hidden transition-all">
            <span className="px-4 py-3 bg-gray-100/50 text-gray-500 text-sm border-r border-gray-200 flex items-center justify-center font-medium">
              short.ly/
            </span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="custom-alias"
              className="flex-1 px-4 py-3 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
          {error.message}
        </div>
      )}

      {result && (
        <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
          <p className="text-sm text-emerald-700 font-medium mb-2 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            URL Shortened Successfully
          </p>
          <div className="flex items-center gap-2 bg-white rounded-lg p-1.5 border border-emerald-100/50 shadow-sm">
            <span className="flex-1 text-indigo-600 text-sm font-medium px-2 truncate selection:bg-indigo-100">
              {result}
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-md hover:bg-indigo-100 transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleCreate}
        disabled={isPending || !url.trim()}
        className="w-full py-3.5 mt-2 bg-indigo-600 text-white font-semibold 
                   rounded-xl shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 
                   transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
      >
        {isPending ? 'Shortening...' : 'Shorten URL'}
      </button>

    </div>
  );
};

export default UrlForm;
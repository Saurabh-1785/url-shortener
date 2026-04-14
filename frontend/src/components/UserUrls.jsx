// src/components/UserUrls.jsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyUrlsApi } from '../api/shortUrl.api.js';

const UserUrls = () => {
    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['my-urls'],
        queryFn: getMyUrlsApi,
        staleTime: 30000,
    });

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-20 bg-gray-100 rounded-2xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 shadow-sm">
                Failed to load URLs: {error.message}
            </div>
        );
    }

    const urls = data?.urls || [];

    if (urls.length === 0) {
        return (
            <div className="text-center py-16 flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                </div>
                <p className="text-gray-800 font-medium text-lg">No links created yet</p>
                <p className="text-gray-500 mt-1 text-sm">Create your first short link using the form.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-250px)] pr-2 custom-scrollbar">
            {urls.map((urlDoc) => (
                <UrlCard key={urlDoc._id} urlDoc={urlDoc} />
            ))}
        </div>
    );
};

const UrlCard = ({ urlDoc }) => {
    const [copied, setCopied] = useState(false);
    const shortUrl = `http://localhost:3000/${urlDoc.shortUrl}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group bg-white border border-gray-100 hover:border-indigo-100 rounded-2xl p-5 
                    flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-sm hover:shadow-md">

            <div className="flex-1 min-w-0">
                <a
                    href={shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 font-semibold text-[15px] hover:text-indigo-700 hover:underline flex flex-wrap gap-1 items-center"
                >
                    {shortUrl}
                    <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
                <p className="text-[13px] text-gray-500 truncate mt-1 max-w-[300px] lg:max-w-[400px]" title={urlDoc.fullUrl}>
                    {urlDoc.fullUrl}
                </p>
            </div>

            <div className="flex items-center gap-4 sm:border-l sm:border-gray-100 sm:pl-4">
                <div className="text-center bg-gray-50 px-4 py-2 rounded-xl min-w-[70px]">
                    <p className="text-lg font-bold text-gray-900 leading-none">
                        {urlDoc.clicks}
                    </p>
                    <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mt-1">clicks</p>
                </div>

                <button
                    onClick={handleCopy}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium
                        transition-all flex items-center justify-center min-w-[90px] ${copied
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>

        </div>
    );
};

export default UserUrls;
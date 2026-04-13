// src/api/shortUrl.api.js
import axiosInstance from './axiosInstance.js';

export const createShortUrlApi = async (url, slug = null) => {
  const { data } = await axiosInstance.post('/api/create', {
    url,
    ...(slug && { slug })  // only send slug if provided
  });
  return data;
};

export const getMyUrlsApi = async () => {
  const { data } = await axiosInstance.get('/api/create/my-urls');
  return data;
};
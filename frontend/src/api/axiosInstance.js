// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,   // ← sends cookies automatically
});

// Global response interceptor
// Handles errors in ONE place
axiosInstance.interceptors.response.use(
  (response) => response,        // success → just return
  (error) => {
    const message = 
      error.response?.data?.message || 
      'Something went wrong';
    
    // You can add toast notifications here
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
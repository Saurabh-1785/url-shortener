// src/api/auth.api.js
import axiosInstance from './axiosInstance.js';

export const registerApi = async (name, email, password) => {
  const { data } = await axiosInstance.post('/api/auth/register', {
    name, email, password
  });
  return data;
};

export const loginApi = async (email, password) => {
  const { data } = await axiosInstance.post('/api/auth/login', {
    email, password
  });
  return data;
};

export const logoutApi = async () => {
  const { data } = await axiosInstance.get('/api/auth/logout');
  return data;
};

export const getCurrentUserApi = async () => {
  const { data } = await axiosInstance.get('/api/auth/me');
  return data;
};
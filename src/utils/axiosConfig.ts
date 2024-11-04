// src/utils/axiosConfig.ts

import axios from 'axios';
import { store } from '@/store/store';
import { logout } from '@/store/slices/authSlice';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '', // Set your API base URL
});

// Function to set or remove the auth token in headers
export const configureAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Axios response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - dispatch logout action
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

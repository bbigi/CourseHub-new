import axios from 'axios';
import {
  clearAccessToken,
  getAccessToken,
  notifyUnauthorized,
} from '../features/auth/authStorage';

export const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearAccessToken();
      notifyUnauthorized();
    }
    return Promise.reject(error);
  },
);

import axios from 'axios';

export const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': import.meta.env.VITE_API_KEY || 'coursehub-local-api-key',
  },
});

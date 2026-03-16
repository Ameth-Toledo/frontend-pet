import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

apiClient.interceptors.request.use((config) => {
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});
import axios from 'axios';
import useLoginStore from '../store/login.store';

const API = axios.create({
  baseURL: process.env.REACT_APP_KAAM_PORTAL_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the Authorization header
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  useLoginStore.getState().setLoaderState(true);
  return config;
});

// Add interceptors for handling response and error
API.interceptors.response.use(
  (response) => {
    useLoginStore.getState().setLoaderState(false);
    return response;
  },
  (error) => {
    useLoginStore.getState().setLoaderState(false);
    throw error;
  }
);

export default API;

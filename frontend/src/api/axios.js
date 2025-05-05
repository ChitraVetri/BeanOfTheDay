import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.response.use(
  res => res,
  error => {
    console.error('API error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;

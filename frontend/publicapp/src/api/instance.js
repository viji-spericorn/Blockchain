import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'accessToken'
    )}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;

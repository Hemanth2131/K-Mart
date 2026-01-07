import axios from 'axios';

const api = axios.create({
  baseURL: 'https://k-mart-gnma.onrender.com',
});

// Attach token before every request
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

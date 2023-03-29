import axios from 'axios';
import { TOKEN_KEY } from '../contexts/auth';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem(TOKEN_KEY); 
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default api;
import axios from 'axios';

const isMockEnv = /_env_=mock/.test(window.location.href);

export const api = axios.create({
  timeout: 5000,
  baseURL: import.meta.env[isMockEnv ? 'VITE_NMB_MOCK_API' : 'VITE_NMB_BASE_API'],
});

api.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code < 300) {
      return res;
    }
    return Promise.reject(res);
  },
  error => {
    return Promise.reject(error);
  }
);

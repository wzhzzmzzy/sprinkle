import axios from 'axios';

export const api = axios.create({
  timeout: 5000,
  baseURL: process.env.VUE_APP_BASE_API
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

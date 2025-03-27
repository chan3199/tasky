import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const login = (email: string, password: string) => {
  return axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
};

export const signup = (email: string, password: string) => {
  return axios.post(`${API_BASE_URL}/api/auth/signup`, { email, password });
};

export const getTodos = () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_BASE_URL}/api/todos`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

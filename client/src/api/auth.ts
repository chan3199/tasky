import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const login = (email: string, password: string) => {
  return axios.post(`${API_BASE_URL}/auth/login`, { email, password });
};

export const signup = (email: string, password: string) => {
  return axios.post(`${API_BASE_URL}/auth/signup`, { email, password });
};

export const getTodos = () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_BASE_URL}/todos`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

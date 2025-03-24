import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const login = async (email: string, password: string) => {
  const res = await API.post('/auth/login', { email, password });
  return res.data.token;
};

export const signup = async (email: string, password: string) => {
  const res = await API.post('/auth/signup', { email, password });
  return res.data;
};

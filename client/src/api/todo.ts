import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// 토큰 자동 주입
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getTodos = async () => {
  const res = await API.get('/api/todos');
  return res.data;
};

export const addTodo = async (text: string) => {
  const res = await API.post('/api/todos', { text });
  return res.data;
};

export const deleteTodo = async (id: number) => {
  const res = await API.delete(`/api/todos/${id}`);
  return res.data;
};

export const toggleTodo = async (id: number) => {
  const res = await API.patch(`/api/todos/${id}`);
  return res.data;
};


import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// 토큰 자동 주입
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getTodos = async () => {
  const res = await API.get('/todos');
  return res.data;
};

export const addTodo = async (text: string) => {
  const res = await API.post('/todos', { text });
  return res.data;
};

export const deleteTodo = async (id: number) => {
  const res = await API.delete(`/todos/${id}`);
  return res.data;
};

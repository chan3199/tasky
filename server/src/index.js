require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

const corsOption = {
  origin: 'https://wondrous-unicorn-f48837.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://wondrous-unicorn-f48837.netlify.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors(corsOption));
app.use(express.json());
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Tasky API 실행 중');
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});

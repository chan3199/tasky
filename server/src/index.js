require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

// ✅ 모든 요청에 대해 CORS 허용
app.use(cors());

// ✅ Preflight 요청 처리 (여기 추가!)
app.options('*', cors());

app.use(express.json());
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Tasky API is running!');
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});

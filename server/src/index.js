const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

// ✅ 모든 origin 허용 (임시)
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// ✅ Preflight 요청 허용
app.options('*', cors(corsOptions));

// ✅ 실제 요청에도 cors 적용
app.use(cors(corsOptions));
app.use(express.json());

// ✅ 요청 로그 확인용 (Render 로그 찍힘)
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.path}`);
  next();
});

// 라우터
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('Tasky API is running!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

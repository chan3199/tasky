require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`, req.headers.origin);
  next();
});

// ✅ CORS 옵션 명확하게 지정
const corsOptions = {
  origin: 'https://wondrous-unicorn-f48837.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

// 가장 먼저 적용!
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// ✅ 기본 라우트
app.get('/', (req, res) => {
  res.send('Tasky API 실행 중');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

const app = express();

// CORS 설정
const corsOptions = {
  origin: 'http://localhost:5175', // Vite dev server
  credentials: true,
};

app.use(cors(corsOptions));

// Body 파싱
app.use(express.json());

// 라우터 연결
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// 기본 라우트 (테스트용)
app.get('/', (req, res) => {
  res.send('✅ Tasky API 서버가 정상 작동 중입니다!');
});

// 서버 실행
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중 → http://localhost:${PORT}`);
});

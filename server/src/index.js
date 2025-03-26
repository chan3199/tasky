require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

// ✅ CORS 옵션 명확하게 지정
const corsOptions = {
  origin: 'https://wondrous-unicorn-f48837.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204, // Safari 대응
};

// ✅ 가장 위에 위치하도록 설정
app.use(cors(corsOptions));

// ✅ 프리플라이트 요청 직접 응답
app.options('*', cors(corsOptions));

// ✅ JSON 파싱
app.use(express.json());

// ✅ 라우터 등록
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`); // ← 요청 메서드 및 경로 확인
  next();
});

// ✅ 기본 라우트
app.get('/', (req, res) => {
  res.send('Tasky API 실행 중');
});

// ✅ 서버 실행
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

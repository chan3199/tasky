const express = require('express');
const cors = require('cors');
const app = express();

// ✅ 1. CORS 직접 설정 (모든 Origin 허용: 테스트용)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://wondrous-unicorn-f48837.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// ✅ 2. preflight 요청 처리 (OPTIONS에 대한 응답 추가)
app.options('*', (req, res) => {
  res.sendStatus(200);
});

// ✅ 3. 기타 설정
app.use(express.json());

// ✅ 4. 라우터 등록
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todo'));

app.listen(4000, () => {
  console.log('✅ Server running on http://localhost:4000');
});

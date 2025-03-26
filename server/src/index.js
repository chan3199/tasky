const express = require('express');
const cors = require('cors');
const app = express();

// 💡 완전 허용하는 CORS 옵션
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// 💡 모든 OPTIONS 요청을 처리하도록 명시
app.options('*', cors(corsOptions));

app.post('/api/auth/signup', (req, res) => {
  console.log('✅ POST /signup reached');
  res.json({ success: true });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});

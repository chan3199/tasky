require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

app.use(cors(
  {
    origin: ['http://localhost:5173', 'https://tasky.netlify.app'], // ✅ Netlify 배포 주소
    credentials: true, // (선택) 인증 정보 쿠키 등을 포함할 때
  }
));
app.use(express.json());
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Tasky API is running!');
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});

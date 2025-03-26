const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
require('dotenv').config();

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

app.use(cors({
  origin: 'https://wondrous-unicorn-f48837.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('Tasky API 실행 중');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

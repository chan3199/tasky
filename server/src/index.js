require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // 임시로 전체 허용
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Tasky API is running!');
});

app.listen(4000, () => {
  console.log('Server on http://localhost:4000');
});

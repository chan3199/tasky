const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const db = require('../db');

// ✅ 할 일 조회
router.get('/', auth, (req, res) => {
  const email = req.user.email;

  db.all('SELECT * FROM todos WHERE email = ?', [email], (err, rows) => {
    if (err) return res.status(500).json({ message: '조회 실패' });
    res.json(rows);
  });
});

// ✅ 할 일 추가
router.post('/', auth, (req, res) => {
  const email = req.user.email;
  const { text } = req.body;

  db.run('INSERT INTO todos (email, text) VALUES (?, ?)', [email, text], function (err) {
    if (err) return res.status(500).json({ message: '추가 실패' });
    res.status(201).json({ id: this.lastID, text });
  });
});

// ✅ 할 일 삭제
router.delete('/:id', auth, (req, res) => {
  const email = req.user.email;
  const id = req.params.id;

  db.run('DELETE FROM todos WHERE id = ? AND email = ?', [id, email], function (err) {
    if (err) return res.status(500).json({ message: '삭제 실패' });
    res.json({ message: '삭제 완료' });
  });
});

module.exports = router;

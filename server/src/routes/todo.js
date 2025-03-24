const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const todos = {}; // 예: { 'user@email.com': [ { id, text } ] }

router.get('/', auth, (req, res) => {
  const email = req.user.email;
  res.json(todos[email] || []);
});

router.post('/', auth, (req, res) => {
  const email = req.user.email;
  const { text } = req.body;

  if (!todos[email]) todos[email] = [];
  const newTodo = { id: Date.now(), text };

  todos[email].push(newTodo);
  res.status(201).json(newTodo);
});

router.delete('/:id', auth, (req, res) => {
  const email = req.user.email;
  const id = parseInt(req.params.id);

  todos[email] = (todos[email] || []).filter(todo => todo.id !== id);
  res.json({ message: '삭제됨' });
});

module.exports = router;

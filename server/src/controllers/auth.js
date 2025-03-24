const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = []; // 메모리에 유저 저장 (DB 없이 간단히)

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const existing = users.find(user => user.email === email);
  if (existing) return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });

  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed });
  res.status(201).json({ message: '회원가입 완료' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email);
  if (!user) return res.status(400).json({ message: '사용자를 찾을 수 없습니다.' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

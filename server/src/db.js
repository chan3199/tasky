const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'tasky.db'), (err) => {
  if (err) return console.error('DB 연결 실패:', err.message);
  console.log('✅ SQLite 연결 성공 !!');
});

// 테이블 생성 (최초 실행 시)
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    email TEXT PRIMARY KEY,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    text TEXT,
    FOREIGN KEY(email) REFERENCES users(email)
  )`);
});

module.exports = db;

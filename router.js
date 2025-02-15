import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from './db.js';

const router = express.Router();

// Đăng ký tài khoản
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi hệ thống' });
    res.status(201).json({ message: 'Đăng ký thành công' });
  });
});

// Đăng nhập
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi hệ thống' });
    if (results.length === 0) return res.status(401).json({ error: 'Tên đăng nhập không đúng' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ error: 'Mật khẩu không đúng' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Đăng nhập thành công', token });
  });
});

// API yêu cầu xác thực
router.get('/protected', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Không có token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token không hợp lệ' });
    res.json({ message: 'Đã xác thực thành công', userId: decoded.id });
  });
});


router.get('/greet', (req, res) => {
  // Lấy dữ liệu từ query string
  const name = req.query.name || 'Guest';
  const age = req.query.age || 'unknown';

  // Trả về phản hồi
  res.send(`Hello, ${name}! You are ${age} years old.`);
});



router.get('/hello', (req, res) => {
  res.json({ message: 'Xin chào' });
});

router.get('/test', (req, res) => {
  res.json({ message: 'Xin chào ân' });
});

export default router;
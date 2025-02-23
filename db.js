import mysql from 'mysql2';
import dotenv from 'dotenv';

// Nạp biến môi trường từ file .env
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Kết nối MySQL thất bại:', err.message);
  } else {
    console.log('Kết nối MySQL thành công!');
  }
});

export default db;

import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes.js';
import dotenv from 'dotenv';
import cors from 'cors'; // Thêm thư viện CORS

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Cho phép CORS từ mọi nguồn
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

import express from 'express';
import { connectDB } from './src/db';
import { sessionMiddleware } from './src/middleware/session';
import authRouter from './src/routes/auth';
import path from 'path';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static('public'));
// Middleware
app.use(express.json());
app.use(sessionMiddleware);

// Database verbinding
connectDB();

// Routes
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import authMiddleware from './middleware/auth.middleware.js';
import User from './models/User.js';
import Question from './models/Question.js';
import Answer from './models/Answer.js';

const app = express();
const PORT = 8000;
const MONGO_URI = 'mongodb://localhost:27017/stackit';
const JWT_SECRET = 'harshpatel'; // Use env var in production

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false, // true in production with HTTPS
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000 // 1 day
};

// harshpatel3411

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes

// Test route
app.get('/', (req, res) => {
  res.send('🚀 StackIt backend is running');
});

// Get logged-in user
app.get('/api/users/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// 🔐 Register user
app.post('/api/users/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, COOKIE_OPTIONS);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Register error:', err);
    res.status(400).json({ error: 'Registration failed. Try a different email.' });
  }
});

// 🔐 Login user
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, COOKIE_OPTIONS);
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 🔓 Logout user
app.post('/api/users/logout', (req, res) => {
  res.clearCookie('token', COOKIE_OPTIONS);
  res.json({ message: 'Logout successful' });
});

// ❓ Post a new question
app.post('/api/questions', async (req, res) => {
  try {
    const { title, description, tags, userId } = req.body;
    const newQuestion = new Question({ title, description, tags, userId });
    await newQuestion.save();
    res.status(201).json({ message: 'Question posted successfully', question: newQuestion });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 💬 Submit an answer
app.post('/api/answers', async (req, res) => {
  try {
    const { questionId, userId, content } = req.body;
    const newAnswer = new Answer({ questionId, userId, content });
    await newAnswer.save();
    res.status(201).json({ message: 'Answer submitted successfully', answer: newAnswer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

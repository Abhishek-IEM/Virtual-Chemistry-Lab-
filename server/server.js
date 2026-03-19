require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const experimentRoutes = require('./routes/experiments');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB().then(async () => {
  const Experiment = require('./models/Experiment');
  const count = await Experiment.countDocuments();
  if (count === 0) {
    console.log('🌱 No experiments found. run "npm run seed" to populate.');
  }
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/experiments', experimentRoutes);

// Health check
app.get('/', (req, res) => res.json({ message: '🧪 Virtual Lab API is running!' }));

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

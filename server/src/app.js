const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const healthRoutes = require('./routes/healthRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/tasks', taskRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to TaskFlow MERN API (Jenkins CI/CD Ready)',
    tier: 'Tier 2 - Backend Application Service',
    healthCheck: '/api/health',
    endpoints: {
      tasks: '/api/tasks',
    },
  });
});

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;

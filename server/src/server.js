const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to Tier 3: MongoDB
connectDB();

const server = app.listen(PORT, () => {
  console.log(`[Tier 2 - Application Layer] Server listening on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Error: ${err.message}`);
  // In production, give server time to finish active requests before closing
  server.close(() => process.exit(1));
});

// Handle graceful termination (SIGTERM/SIGINT) for Docker / Jenkins
const gracefulShutdown = () => {
  console.log('Received kill signal, shutting down gracefully...');
  server.close(() => {
    console.log('Closed out remaining connections.');
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

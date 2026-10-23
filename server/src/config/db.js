const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskflow_db', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Tier 3 - Data Layer] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[Tier 3 - Data Layer] MongoDB Connection Error: ${error.message}`);
    // If not in test environment, we can decide whether to exit
    if (process.env.NODE_ENV !== 'test') {
      console.warn('Backend running with disconnected database. Retrying on query or next connection attempt.');
    }
    return null;
  }
};

const getDBStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return states[mongoose.connection.readyState] || 'unknown';
};

module.exports = { connectDB, getDBStatus };

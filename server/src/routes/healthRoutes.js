const express = require('express');
const router = express.Router();
const { getDBStatus } = require('../config/db');

// @desc    Health Check Endpoint (Used by Jenkins CI/CD & Docker Healthcheck)
// @route   GET /api/health
// @access  Public
router.get('/', (req, res) => {
  const dbStatus = getDBStatus();

  res.status(200).json({
    status: 'healthy',
    tier: 'Tier 2 - Backend Application Layer',
    timestamp: new Date().toISOString(),
    uptime: `${process.uptime().toFixed(2)}s`,
    database: {
      tier: 'Tier 3 - Data Layer (MongoDB)',
      status: dbStatus,
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsageMB: (process.memoryUsage().rss / (1024 * 1024)).toFixed(2),
    },
  });
});

module.exports = router;

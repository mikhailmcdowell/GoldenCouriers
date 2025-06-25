// server/src/routes/testRoutes.js
const express = require('express');
const router = express.Router();
const prisma = require('../utils/prisma');

router.get('/test-db', async (req, res) => {
  try {
    // Simple query to test connection
    const usersCount = await prisma.user.count();
    const packagesCount = await prisma.package.count();
    
    res.json({
      success: true,
      message: 'Database connection successful',
      stats: {
        users: usersCount,
        packages: packagesCount
      }
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});

module.exports = router;
// server/src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');


const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database connection test
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', database: 'Connected' });
});

// Routes will be added here
// In your server/src/app.js
const testRoutes = require('./routes/testRoutes');
app.use('/api/test', testRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
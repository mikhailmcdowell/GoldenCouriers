// server/src/utils/prisma.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Adjust logging as needed
});

module.exports = prisma;
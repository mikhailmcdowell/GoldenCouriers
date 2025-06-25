import express from 'express';
import { authenticate, authorize } from '../middlewares/auth.js';
import { getUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/me', authenticate, getUserProfile);
router.get('/admin-only', authenticate, authorize(['admin']), adminAction);

export default router;


/*const express = require('express');
const router = express.Router();

// Mock user database
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get single user
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Create user
router.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router; */
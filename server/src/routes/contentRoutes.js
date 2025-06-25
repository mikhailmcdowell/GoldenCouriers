const express = require('express');
const router = express.Router();

// Mock content database
let contents = [
  { id: 1, title: 'First Post', body: 'This is the first content' },
  { id: 2, title: 'Second Post', body: 'This is the second content' },
];

// Similar CRUD operations as user routes
// ...

module.exports = router;
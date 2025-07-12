const express = require('express');
const router = express.Router();

// Get user profile
router.get('/profile', (req, res) => {
  res.json({
    success: true,
    data: {
      id: 1,
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date().toISOString()
    }
  });
});

// Update user profile
router.put('/profile', (req, res) => {
  res.json({
    success: true,
    message: 'Profile updated successfully'
  });
});

module.exports = router; 
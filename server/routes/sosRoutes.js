const express = require('express');
const router = express.Router();

// SOS route
router.post('/trigger', (req, res) => {
  const { location, message } = req.body;
  // Handle SOS logic here
  res.send('SOS Triggered');
});

module.exports = router;

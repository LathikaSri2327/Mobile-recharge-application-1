const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Mobile Recharge API',
    timestamp: new Date().toISOString() 
  });
});

router.get('/db-status', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({
    status: states[dbState],
    database: mongoose.connection.name || 'Not connected'
  });
});

module.exports = router;
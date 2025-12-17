const express = require('express');
const Recharge = require('../models/Recharge');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/recharges', authenticateToken, authorize('admin', 'agent'), async (req, res) => {
  try {
    const recharges = await Recharge.find()
      .populate('userId', 'firstName lastName email phone')
      .sort({ createdAt: -1 });
    res.json(recharges);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/recharge', authenticateToken, authorize('admin', 'agent'), async (req, res) => {
  try {
    const recharge = new Recharge({
      ...req.body,
      processedBy: req.user._id
    });
    await recharge.save();
    res.json(recharge);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
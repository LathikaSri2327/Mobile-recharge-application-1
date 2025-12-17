const express = require('express');
const User = require('../models/User');
const Recharge = require('../models/Recharge');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/users', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/users/:id/status', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/stats', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRecharges = await Recharge.countDocuments();
    const totalRevenue = await Recharge.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    res.json({
      totalUsers,
      totalRecharges,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
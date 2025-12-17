const express = require('express');
const Recharge = require('../models/Recharge');
const { authenticateToken, authorize } = require('../middleware/auth');
const { processRecharge } = require('../controllers/rechargeController');
const router = express.Router();

// Create recharge (customers and agents)
router.post('/', authenticateToken, authorize('customer', 'agent'), processRecharge);

// Get user's recharge history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    let query = {};
    
    // Customers see only their recharges
    if (req.user.role === 'customer') {
      query.userId = req.user._id;
    }
    // Admins and agents see all recharges
    
    const recharges = await Recharge.find(query)
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 });
    res.json(recharges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin only: Get all recharges
router.get('/admin/all', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const recharges = await Recharge.find()
      .populate('userId', 'firstName lastName email phone')
      .sort({ createdAt: -1 });
    res.json(recharges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
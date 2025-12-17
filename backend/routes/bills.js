const express = require('express');
const BillPayment = require('../models/BillPayment');
const { payBill } = require('../controllers/rechargeController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/pay', authenticateToken, payBill);

router.get('/history', authenticateToken, async (req, res) => {
  try {
    const bills = await BillPayment.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
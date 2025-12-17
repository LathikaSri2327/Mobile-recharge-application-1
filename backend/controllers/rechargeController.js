const Recharge = require('../models/Recharge');
const BillPayment = require('../models/BillPayment');

const payBill = async (req, res) => {
  try {
    const { billType, amount, consumerNumber } = req.body;
    
    const billPayment = new BillPayment({
      userId: req.user._id,
      billType,
      amount,
      consumerNumber,
      status: 'success'
    });
    
    await billPayment.save();
    res.json({ message: 'Bill payment successful', billPayment });
  } catch (error) {
    res.status(500).json({ message: 'Bill payment failed', error: error.message });
  }
};

const processRecharge = async (req, res) => {
  try {
    const { phoneNumber, amount, operator, planName } = req.body;
    
    console.log('User ID:', req.user._id);
    console.log('Recharge data:', { phoneNumber, amount, operator, planName });
    
    const recharge = new Recharge({
      userId: req.user._id,
      phoneNumber,
      amount,
      operator,
      planName,
      status: 'completed'
    });
    
    const savedRecharge = await recharge.save();
    console.log('Saved recharge:', savedRecharge);
    
    res.json({ 
      message: 'Recharge processed successfully', 
      recharge: savedRecharge
    });
  } catch (error) {
    console.error('Recharge error:', error);
    res.status(500).json({ message: 'Recharge processing failed', error: error.message });
  }
};

module.exports = { payBill, processRecharge };
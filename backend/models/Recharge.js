const mongoose = require('mongoose');

const rechargeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planName: String,
  amount: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  operator: String,
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
  processedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Recharge', rechargeSchema);
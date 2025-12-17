const mongoose = require('mongoose');

const billPaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  billType: { type: String, enum: ['electric', 'water', 'dth'], required: true },
  consumerNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  transactionId: { type: String, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('BillPayment', billPaymentSchema);
const mongoose = require('mongoose');

const billServiceSchema = new mongoose.Schema({
  serviceId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('BillService', billServiceSchema);
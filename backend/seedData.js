const mongoose = require('mongoose');
const Plan = require('./models/Plan');
const BillService = require('./models/BillService');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/recharge-app');
    
    // Clear existing data
    await Plan.deleteMany({});
    await BillService.deleteMany({});
    
    // Seed plans
    const plans = [
      { name: 'Basic Plan', operator: 'Airtel', amount: 199, validity: '28 Days', data: '1GB/day' },
      { name: 'Standard Plan', operator: 'Jio', amount: 299, validity: '30 Days', data: '2GB/day' },
      { name: 'Premium Plan', operator: 'Vi', amount: 499, validity: '28 Days', data: 'Unlimited' },
      { name: 'Ultra Plan', operator: 'BSNL', amount: 699, validity: '30 Days', data: '5GB/day' },
      { name: 'Family Plan', operator: 'Airtel', amount: 999, validity: '30 Days', data: '10GB shared' },
      { name: 'Student Plan', operator: 'Jio', amount: 149, validity: '28 Days', data: '500MB/day' },
      { name: 'Senior Plan', operator: 'Vi', amount: 99, validity: '30 Days', data: '200MB/day' },
      { name: 'Business Plan', operator: 'Airtel', amount: 1299, validity: '30 Days', data: '20GB/day' },
      { name: 'Gaming Plan', operator: 'Jio', amount: 799, validity: '28 Days', data: '8GB/day' },
      { name: 'Entertainment Plan', operator: 'Vi', amount: 599, validity: '30 Days', data: '4GB/day' },
      { name: 'Travel Plan', operator: 'BSNL', amount: 399, validity: '15 Days', data: '3GB/day' },
      { name: 'Weekend Plan', operator: 'Airtel', amount: 249, validity: '7 Days', data: '2GB/day' }
    ];
    
    await Plan.insertMany(plans);
    console.log('Plans seeded successfully');
    
    // Seed bill services
    const billServices = [
      { serviceId: 'electric', name: 'Electricity Bill', icon: '⚡', color: '#FFD700' },
      { serviceId: 'water', name: 'Water Bill', icon: '💧', color: '#00BFFF' },
      { serviceId: 'dth', name: 'DTH Recharge', icon: '📺', color: '#FF4500' },
      { serviceId: 'gas', name: 'Gas Bill', icon: '🔥', color: '#FF6347' },
      { serviceId: 'internet', name: 'Internet Bill', icon: '🌐', color: '#32CD32' }
    ];
    
    await BillService.insertMany(billServices);
    console.log('Bill services seeded successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
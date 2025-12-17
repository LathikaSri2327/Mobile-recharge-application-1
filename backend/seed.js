const mongoose = require('mongoose');
const Plan = require('./models/Plan');

mongoose.connect('mongodb://localhost:27017/mobile-recharge')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    await Plan.deleteMany({});
    
    const plans = [
      { name: 'Basic Plan', amount: 199, validity: '28 Days', data: '1GB/day' },
      { name: 'Standard Plan', amount: 299, validity: '30 Days', data: '2GB/day' },
      { name: 'Premium Plan', amount: 499, validity: '28 Days', data: 'Unlimited' },
      { name: 'Ultra Plan', amount: 699, validity: '30 Days', data: '5GB/day' },
      { name: 'Family Plan', amount: 999, validity: '30 Days', data: '10GB shared' },
      { name: 'Student Plan', amount: 149, validity: '28 Days', data: '500MB/day' },
      { name: 'Senior Plan', amount: 99, validity: '30 Days', data: '200MB/day' },
      { name: 'Business Plan', amount: 1299, validity: '30 Days', data: '20GB/day' },
      { name: 'Gaming Plan', amount: 799, validity: '28 Days', data: '8GB/day' },
      { name: 'Entertainment Plan', amount: 599, validity: '30 Days', data: '4GB/day' },
      { name: 'Travel Plan', amount: 399, validity: '15 Days', data: '3GB/day' },
      { name: 'Weekend Plan', amount: 249, validity: '7 Days', data: '2GB/day' },
      { name: 'Night Owl Plan', amount: 179, validity: '28 Days', data: '1.5GB/day' },
      { name: 'Work From Home', amount: 449, validity: '30 Days', data: '3GB/day' },
      { name: 'Unlimited Pro', amount: 1599, validity: '84 Days', data: 'Unlimited' }
    ];
    
    await Plan.insertMany(plans);
    console.log('Plans seeded successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
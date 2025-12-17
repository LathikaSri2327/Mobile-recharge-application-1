const mongoose = require('mongoose');
const Plan = require('./models/Plan');
require('dotenv').config();

const seedPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mobile-recharge');
    
    // Clear existing plans
    await Plan.deleteMany({});
    
    // Create comprehensive plans
    const plans = [
      // Budget Plans
      { name: 'Mini Plan', amount: 99, validity: '14 Days', data: '500MB/day', description: 'Perfect for light users' },
      { name: 'Basic Plan', amount: 149, validity: '21 Days', data: '1GB/day', description: 'Ideal for daily browsing' },
      { name: 'Starter Plan', amount: 199, validity: '28 Days', data: '1.5GB/day', description: 'Great for social media' },
      
      // Popular Plans
      { name: 'Standard Plan', amount: 299, validity: '28 Days', data: '2GB/day', description: 'Most popular choice' },
      { name: 'Smart Plan', amount: 349, validity: '30 Days', data: '2.5GB/day', description: 'Smart savings for 30 days' },
      { name: 'Value Plan', amount: 399, validity: '35 Days', data: '2GB/day', description: 'Extended validity' },
      
      // Premium Plans
      { name: 'Premium Plan', amount: 499, validity: '28 Days', data: '3GB/day', description: 'Premium experience' },
      { name: 'Power Plan', amount: 599, validity: '56 Days', data: '2GB/day', description: 'Long term savings' },
      { name: 'Ultra Plan', amount: 699, validity: '84 Days', data: '1.5GB/day', description: 'Maximum validity' },
      
      // High Data Plans
      { name: 'Data Booster', amount: 449, validity: '28 Days', data: '4GB/day', description: 'Heavy data usage' },
      { name: 'Unlimited Basic', amount: 549, validity: '28 Days', data: 'Unlimited', description: 'Unlimited at 1Mbps after 2GB/day' },
      { name: 'Unlimited Pro', amount: 749, validity: '28 Days', data: 'Unlimited', description: 'Unlimited at 1Mbps after 4GB/day' },
      
      // Special Plans
      { name: 'Weekend Special', amount: 179, validity: '7 Days', data: '3GB/day', description: 'Perfect for weekends' },
      { name: 'Work From Home', amount: 999, validity: '84 Days', data: '3GB/day', description: 'Ideal for remote work' },
      { name: 'Student Plan', amount: 239, validity: '28 Days', data: '2GB/day', description: 'Special student offer' },
      
      // Top-up Plans
      { name: 'Data Add-on 1GB', amount: 19, validity: '1 Day', data: '1GB', description: 'Emergency data top-up' },
      { name: 'Data Add-on 5GB', amount: 75, validity: '7 Days', data: '5GB', description: 'Weekly data boost' },
      { name: 'Night Pack', amount: 49, validity: '30 Days', data: '1GB (12AM-6AM)', description: 'Night time browsing' },
      
      // Annual Plans
      { name: 'Annual Saver', amount: 2999, validity: '365 Days', data: '2GB/day', description: 'Best annual value' },
      { name: 'Annual Premium', amount: 3999, validity: '365 Days', data: '3GB/day', description: 'Premium annual plan' }
    ];
    
    await Plan.insertMany(plans);
    console.log(`${plans.length} plans seeded successfully!`);
    console.log('Plan categories added:');
    console.log('- Budget Plans (₹99-₹199)');
    console.log('- Popular Plans (₹299-₹399)');
    console.log('- Premium Plans (₹499-₹699)');
    console.log('- High Data Plans (₹449-₹749)');
    console.log('- Special Plans (₹179-₹999)');
    console.log('- Top-up Plans (₹19-₹75)');
    console.log('- Annual Plans (₹2999-₹3999)');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding plans:', error);
  }
};

seedPlans();
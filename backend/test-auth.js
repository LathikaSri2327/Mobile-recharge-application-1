const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function testAuth() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mobile-recharge');
    console.log('Connected to MongoDB');

    // Check if user exists
    const email = 'lathikasri.r2024laids@sece.ac.in';
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log('User exists:', existingUser.email);
    } else {
      console.log('User does not exist. Creating test user...');
      
      // Create test user
      const hashedPassword = await bcrypt.hash('password123', 10);
      const newUser = new User({
        firstName: 'Lathika',
        lastName: 'Sri',
        email: email,
        phone: '9876543210',
        password: hashedPassword
      });
      
      await newUser.save();
      console.log('Test user created successfully');
      console.log('Email:', email);
      console.log('Password: password123');
    }
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAuth();
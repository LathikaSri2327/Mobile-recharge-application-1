const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
    
    // Test user creation
    const testUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '1234567890',
      password: 'password123',
      role: 'customer'
    };
    
    // Check if test user exists
    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      console.log('✅ Test user already exists');
      
      // Test password comparison
      const isMatch = await existingUser.comparePassword('password123');
      console.log('✅ Password comparison works:', isMatch);
    } else {
      // Create test user
      const user = new User(testUser);
      await user.save();
      console.log('✅ Test user created successfully');
    }
    
    mongoose.disconnect();
    console.log('✅ Test completed successfully');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testConnection();
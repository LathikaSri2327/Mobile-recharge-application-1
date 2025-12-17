const axios = require('axios');

async function testAuthRoutes() {
  try {
    console.log('Testing auth routes...');
    
    // Test registration endpoint
    console.log('\n1. Testing registration...');
    const registerData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '1234567890',
      password: 'password123',
      role: 'customer'
    };
    
    try {
      const registerResponse = await axios.post('http://localhost:5000/api/auth/register', registerData);
      console.log('✅ Registration successful:', registerResponse.data.message);
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message?.includes('already exists')) {
        console.log('ℹ️ User already exists, trying login...');
      } else {
        console.error('❌ Registration error:', error.response?.data || error.message);
      }
    }
    
    // Test login endpoint
    console.log('\n2. Testing login...');
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    try {
      const loginResponse = await axios.post('http://localhost:5000/api/auth/login', loginData);
      console.log('✅ Login successful:', loginResponse.data.message);
      console.log('Token received:', !!loginResponse.data.token);
    } catch (error) {
      console.error('❌ Login error:', error.response?.data || error.message);
    }
    
    // Test forgot password endpoint
    console.log('\n3. Testing forgot password...');
    try {
      const forgotResponse = await axios.post('http://localhost:5000/api/auth/forgot-password', {
        email: 'test@example.com'
      });
      console.log('✅ Forgot password successful:', forgotResponse.data.message);
    } catch (error) {
      console.error('❌ Forgot password error:', error.response?.data || error.message);
    }
    
  } catch (error) {
    console.error('❌ General error:', error.message);
  }
}

testAuthRoutes();
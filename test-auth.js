const axios = require('axios');

async function testAuth() {
  const baseURL = 'http://localhost:5002/api';
  
  try {
    console.log('Testing registration...');
    const registerData = {
      firstName: 'Test',
      lastName: 'User',
      email: `test${Date.now()}@example.com`,
      phone: '1234567890',
      password: 'password123',
      role: 'customer'
    };
    
    const registerResponse = await axios.post(`${baseURL}/auth/register`, registerData);
    console.log('✅ Registration successful');
    
    console.log('Testing login...');
    const loginResponse = await axios.post(`${baseURL}/auth/login`, {
      email: registerData.email,
      password: registerData.password
    });
    console.log('✅ Login successful');
    
    console.log('🎉 Authentication working!');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testAuth();
const axios = require('axios');

async function testBackend() {
  const baseURL = 'http://localhost:5002/api';
  
  try {
    // Test health endpoint
    console.log('Testing backend connection...');
    const healthResponse = await axios.get('http://localhost:5002/health');
    console.log('✅ Backend is running:', healthResponse.data);
    
    // Test registration
    console.log('\nTesting registration...');
    const registerData = {
      firstName: 'John',
      lastName: 'Doe',
      email: `test${Date.now()}@example.com`,
      phone: '1234567890',
      password: 'password123',
      role: 'customer'
    };
    
    const registerResponse = await axios.post(`${baseURL}/auth/register`, registerData);
    console.log('✅ Registration successful:', registerResponse.data.message);
    
    // Test login
    console.log('\nTesting login...');
    const loginResponse = await axios.post(`${baseURL}/auth/login`, {
      email: registerData.email,
      password: registerData.password
    });
    console.log('✅ Login successful:', loginResponse.data.message);
    
    console.log('\n🎉 All tests passed! Backend is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the backend server is running on port 5002');
      console.log('Run: cd backend && npm start');
    }
  }
}

testBackend();
const axios = require('axios');

async function testConnection() {
  console.log('🔍 Testing Backend-Frontend Connection...\n');
  
  try {
    // Test backend health
    console.log('1. Testing Backend Health...');
    const healthResponse = await axios.get('http://localhost:5002/health');
    console.log('✅ Backend Health:', healthResponse.data);
    
    // Test API root
    console.log('\n2. Testing API Root...');
    const apiResponse = await axios.get('http://localhost:5002/api');
    console.log('❌ API Root failed - this is expected');
  } catch (error) {
    if (error.response?.status === 404) {
      console.log('✅ API Root returns 404 - this is correct behavior');
    } else {
      console.log('❌ Backend connection failed:', error.message);
    }
  }
  
  try {
    // Test auth endpoint
    console.log('\n3. Testing Auth Endpoint...');
    const authResponse = await axios.post('http://localhost:5002/api/auth/login', {
      email: 'test@test.com',
      password: 'wrongpassword'
    });
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('✅ Auth endpoint responding correctly');
    } else {
      console.log('❌ Auth endpoint error:', error.message);
    }
  }
  
  console.log('\n📋 Connection Test Complete');
}

testConnection();
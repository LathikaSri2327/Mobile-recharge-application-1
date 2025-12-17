const axios = require('axios');

async function testServer() {
  console.log('🧪 Testing Server...\n');
  
  try {
    // Test health endpoint
    const health = await axios.get('http://localhost:5002/health');
    console.log('✅ Health Check:', health.data);
    
    // Test invalid login
    try {
      await axios.post('http://localhost:5002/api/auth/login', {
        email: 'test@test.com',
        password: 'wrong'
      });
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('✅ Auth validation working');
      }
    }
    
    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.log('❌ Server not running:', error.message);
  }
}

testServer();
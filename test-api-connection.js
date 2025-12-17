const axios = require('axios');

async function testAPI() {
  try {
    console.log('Testing backend API connection...');
    
    // Test root endpoint
    const rootResponse = await axios.get('http://localhost:5000/');
    console.log('✅ Root endpoint:', rootResponse.data);
    
    // Test health endpoint
    const healthResponse = await axios.get('http://localhost:5000/health');
    console.log('✅ Health endpoint:', healthResponse.data);
    
    // Test API health endpoint
    const apiHealthResponse = await axios.get('http://localhost:5000/api/health');
    console.log('✅ API Health endpoint:', apiHealthResponse.data);
    
    console.log('\n🎉 Backend API is working correctly!');
    
  } catch (error) {
    console.error('❌ API Connection Error:');
    console.error('Status:', error.response?.status);
    console.error('Message:', error.response?.data || error.message);
    console.error('URL:', error.config?.url);
  }
}

testAPI();
const axios = require('axios');

const BASE_URL = 'http://localhost:5002';

async function testAPI() {
  console.log('🧪 Testing API Endpoints...\n');

  try {
    // Test 1: Root endpoint
    console.log('1. Testing root endpoint...');
    const root = await axios.get(`${BASE_URL}/`);
    console.log('✅ Root:', root.data);

    // Test 2: Health check
    console.log('\n2. Testing health endpoint...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health:', health.data);

    // Test 3: API health
    console.log('\n3. Testing API health endpoint...');
    const apiHealth = await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ API Health:', apiHealth.data);

    // Test 4: Get plans
    console.log('\n4. Testing plans endpoint...');
    const plans = await axios.get(`${BASE_URL}/api/plans`);
    console.log('✅ Plans:', plans.data.length, 'plans found');

    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testAPI();
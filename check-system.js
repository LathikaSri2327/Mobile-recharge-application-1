const { exec } = require('child_process');
const axios = require('axios');

async function checkSystem() {
  console.log('🔍 System Health Check\n');
  
  // Check MongoDB
  console.log('1. Checking MongoDB...');
  exec('tasklist /FI "IMAGENAME eq mongod.exe"', (error, stdout) => {
    if (stdout.includes('mongod.exe')) {
      console.log('✅ MongoDB is running');
    } else {
      console.log('❌ MongoDB is not running');
      console.log('💡 Start with: net start MongoDB');
    }
  });
  
  // Check backend
  setTimeout(async () => {
    console.log('\n2. Checking Backend API...');
    try {
      const response = await axios.get('http://localhost:5002/health', { timeout: 3000 });
      console.log('✅ Backend is running:', response.data);
    } catch (error) {
      console.log('❌ Backend is not running');
      console.log('💡 Start with: cd backend && npm start');
    }
    
    // Check frontend
    console.log('\n3. Checking Frontend...');
    try {
      const response = await axios.get('http://localhost:3000', { timeout: 3000 });
      console.log('✅ Frontend is running');
    } catch (error) {
      console.log('❌ Frontend is not running');
      console.log('💡 Start with: npm start');
    }
    
    console.log('\n📋 Health Check Complete');
  }, 1000);
}

checkSystem();
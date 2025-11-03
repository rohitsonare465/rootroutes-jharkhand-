const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testLogin() {
  console.log('\n=== Testing Login API ===\n');
  
  try {
    // First, let's register a test user
    console.log('1. Registering test user...');
    const registerResponse = await axios.post(`${API_URL}/auth/register`, {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    });
    
    console.log('✓ Registration successful!');
    console.log('Response:', JSON.stringify(registerResponse.data, null, 2));
    
    const testEmail = registerResponse.data.data.email;
    
    // Now test login with the registered user
    console.log('\n2. Testing login with registered user...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: testEmail,
      password: 'password123'
    });
    
    console.log('✓ Login successful!');
    console.log('Response:', JSON.stringify(loginResponse.data, null, 2));
    
    // Test with wrong password
    console.log('\n3. Testing login with wrong password...');
    try {
      await axios.post(`${API_URL}/auth/login`, {
        email: testEmail,
        password: 'wrongpassword'
      });
    } catch (error) {
      console.log('✓ Correctly rejected wrong password');
      console.log('Response:', JSON.stringify(error.response.data, null, 2));
    }
    
    // Test with non-existent user
    console.log('\n4. Testing login with non-existent user...');
    try {
      await axios.post(`${API_URL}/auth/login`, {
        email: 'nonexistent@example.com',
        password: 'password123'
      });
    } catch (error) {
      console.log('✓ Correctly rejected non-existent user');
      console.log('Response:', JSON.stringify(error.response.data, null, 2));
    }
    
    console.log('\n=== All tests completed! ===\n');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Test failed!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
}

testLogin();

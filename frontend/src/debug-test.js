import { authAPI } from './services/api.js';

// Quick test to verify API configuration
console.log('Environment API URL:', import.meta.env.VITE_API_URL);
console.log('Testing API connectivity...');

// Test the API
authAPI.register({
  name: 'Debug Test',
  email: 'debug@test.com',
  password: 'test123'
}).then(response => {
  console.log('API Test Success:', response);
}).catch(error => {
  console.log('API Test Error:', error);
});

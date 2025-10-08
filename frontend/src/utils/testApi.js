// Test script to verify API connection
const API_BASE_URL = 'http://localhost:3001/api/countries';

export const testApiConnection = async () => {
  try {
    console.log('Testing API connection...');
    
    // Test GET all countries
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    
    console.log('API Response:', data);
    console.log('Connection successful!');
    
    return { success: true, data };
  } catch (error) {
    console.error('API Connection failed:', error);
    return { success: false, error: error.message };
  }
};

// Test individual endpoints
export const testApiEndpoints = async () => {
  const tests = [
    { name: 'GET /api/countries', method: 'GET', url: API_BASE_URL },
    { name: 'POST /api/countries', method: 'POST', url: API_BASE_URL, body: { name: 'Test Country', capital: 'Test Capital', currency: 'Test Currency' } },
  ];

  for (const test of tests) {
    try {
      console.log(`Testing ${test.name}...`);
      const response = await fetch(test.url, {
        method: test.method,
        headers: { 'Content-Type': 'application/json' },
        body: test.body ? JSON.stringify(test.body) : undefined,
      });
      
      const data = await response.json();
      console.log(`${test.name} - Success:`, data);
    } catch (error) {
      console.error(`${test.name} - Error:`, error);
    }
  }
};

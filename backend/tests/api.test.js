const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');

// Clean up database before all tests
beforeAll(async () => {
  // Wait for database connection
  if (mongoose.connection.readyState !== 1) {
    await new Promise((resolve) => {
      mongoose.connection.once('connected', resolve);
    });
  }
});

// Clean up after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('API Health Check', () => {
  test('GET /api/health should return success', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('timestamp');
  });
});

describe('Auth Endpoints', () => {
  test('POST /api/auth/register should create new user', async () => {
    const userData = {
      name: 'Test User',
      email: `test-${Date.now()}@test.com`,
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data).toHaveProperty('email', userData.email);
    expect(response.body.data).toHaveProperty('name', userData.name);
  });

  test('POST /api/auth/register should reject duplicate email', async () => {
    const uniqueEmail = `duplicate-${Date.now()}-${Math.random().toString(36).substring(7)}@test.com`;
    const userData = {
      name: 'Test User',
      email: uniqueEmail,
      password: 'password123'
    };

    // First registration should succeed
    const firstResponse = await request(app)
      .post('/api/auth/register')
      .send(userData);

    if (firstResponse.status !== 201) {
      console.error('First registration failed:', firstResponse.body);
    }
    expect(firstResponse.status).toBe(201);

    // Second registration with same email should fail
    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(400);

    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body.message).toContain('already exists');
  });

  test('POST /api/auth/login should authenticate valid user', async () => {
    const userData = {
      name: 'Login Test User',
      email: `login-${Date.now()}@test.com`,
      password: 'password123'
    };

    // Register user first
    await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(201);

    // Then login
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: userData.email,
        password: userData.password
      })
      .expect(200);

    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data).toHaveProperty('email', userData.email);
  });

  test('POST /api/auth/login should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@test.com',
        password: 'wrongpassword'
      })
      .expect(401);

    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body.message).toContain('Invalid');
  });
});

describe('Destinations Endpoints', () => {
  let authToken;
  let userId;

  beforeAll(async () => {
    // Create a user for authenticated tests
    const userData = {
      name: 'Test User for Destinations',
      email: `dest-user-${Date.now()}@test.com`,
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData);

    authToken = response.body.data.token;
    userId = response.body.data._id;
  });

  test('GET /api/destinations should return destinations list', async () => {
    const response = await request(app)
      .get('/api/destinations')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body.data).toHaveProperty('destinations');
    expect(response.body.data).toHaveProperty('pagination');
    expect(Array.isArray(response.body.data.destinations)).toBe(true);
  });

  test('GET /api/destinations with search should filter results', async () => {
    const response = await request(app)
      .get('/api/destinations?search=falls')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'success');
    expect(Array.isArray(response.body.data.destinations)).toBe(true);
  });

  test('POST /api/destinations should create new destination (authenticated)', async () => {
    const destinationData = {
      title: 'Test Destination',
      description: 'A test destination for automated testing',
      location: 'Test Location, Jharkhand',
      images: [{
        url: 'https://example.com/test-image.jpg',
        alt: 'Test image'
      }],
      tags: ['nature', 'adventure'],
      difficulty: 'easy'
    };

    const response = await request(app)
      .post('/api/destinations')
      .set('Authorization', `Bearer ${authToken}`)
      .send(destinationData)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body.data).toHaveProperty('title', destinationData.title);
    expect(response.body.data).toHaveProperty('location', destinationData.location);
    expect(response.body.data.createdBy).toHaveProperty('name');
  });

  test('POST /api/destinations should require authentication', async () => {
    const destinationData = {
      title: 'Unauthorized Destination',
      description: 'This should not be created',
      location: 'Test Location'
    };

    const response = await request(app)
      .post('/api/destinations')
      .send(destinationData)
      .expect(401);

    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body.message).toContain('authorized');
  });

  test('GET /api/destinations/:id should return destination details', async () => {
    // First create a destination
    const destinationData = {
      title: 'Detail Test Destination',
      description: 'Testing destination details endpoint',
      location: 'Test Location, Jharkhand'
    };

    const createResponse = await request(app)
      .post('/api/destinations')
      .set('Authorization', `Bearer ${authToken}`)
      .send(destinationData);

    const destinationId = createResponse.body.data._id;

    // Then get its details
    const response = await request(app)
      .get(`/api/destinations/${destinationId}`)
      .expect(200);

    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body.data).toHaveProperty('_id', destinationId);
    expect(response.body.data).toHaveProperty('title', destinationData.title);
  });

  test('GET /api/destinations/:id should return 404 for non-existent destination', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    
    const response = await request(app)
      .get(`/api/destinations/${fakeId}`)
      .expect(404);

    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body.message).toContain('not found');
  });
});

describe('Error Handling', () => {
  test('Should return 404 for non-existent routes', async () => {
    const response = await request(app)
      .get('/api/non-existent-route')
      .expect(404);

    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body.message).toContain('not found');
  });
});

// Clean up after tests
afterAll(async () => {
  // Close any database connections if needed
  if (app.close) {
    app.close();
  }
});
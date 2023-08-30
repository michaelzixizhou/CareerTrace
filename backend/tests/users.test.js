const request = require('supertest');
const app = require('../app'); // Update with the correct path to your app

describe('User API', () => {
  it('should fetch all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    // Add more assertions based on your expected behavior
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Test User', email: 'test@example.com' });
    expect(response.status).toBe(200);
    // Add more assertions based on your expected behavior
  });
});

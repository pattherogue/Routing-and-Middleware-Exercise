const request = require('supertest');
const app = require('./app');

describe('GET /items', () => {
  test('It should respond with an array of items', async () => {
    const response = await request(app).get('/items');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});

// Run the server if not in test mode
if (!module.parent) {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

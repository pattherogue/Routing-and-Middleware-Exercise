const request = require('supertest');
const app = require('./app');

describe('Express Shopping List API', () => {
  // Test GET /items
  describe('GET /items', () => {
    it('responds with an array of items', async () => {
      const response = await request(app).get('/items');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test POST /items
  describe('POST /items', () => {
    it('adds a new item to the list', async () => {
      const newItem = { name: 'testItem', price: 10 };
      const response = await request(app).post('/items').send(newItem);
      expect(response.statusCode).toBe(201);
      expect(response.body.added).toEqual(newItem);
    });
  });

  // Test GET /items/:name
  describe('GET /items/:name', () => {
    it('responds with a single item', async () => {
      const itemName = 'testItem';
      const newItem = { name: itemName, price: 10 };
      await request(app).post('/items').send(newItem);
      const response = await request(app).get(`/items/${itemName}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(newItem);
    });

    it('responds with 404 if item not found', async () => {
      const response = await request(app).get('/items/nonexistent');
      expect(response.statusCode).toBe(404);
    });
  });

  // Test PATCH /items/:name
  describe('PATCH /items/:name', () => {
    it('updates a single item', async () => {
      const itemName = 'testItem';
      const newItem = { name: itemName, price: 10 };
      await request(app).post('/items').send(newItem);

      const updatedItem = { name: 'updatedItem', price: 20 };
      const response = await request(app).patch(`/items/${itemName}`).send(updatedItem);
      expect(response.statusCode).toBe(200);
      expect(response.body.updated).toEqual(updatedItem);
    });

    it('responds with 404 if item not found', async () => {
      const updatedItem = { name: 'updatedItem', price: 20 };
      const response = await request(app).patch('/items/nonexistent').send(updatedItem);
      expect(response.statusCode).toBe(404);
    });
  });

  // Test DELETE /items/:name
  describe('DELETE /items/:name', () => {
    it('deletes a single item', async () => {
      const itemName = 'testItem';
      const newItem = { name: itemName, price: 10 };
      await request(app).post('/items').send(newItem);

      const response = await request(app).delete(`/items/${itemName}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Deleted');
    });

    it('responds with 404 if item not found', async () => {
      const response = await request(app).delete('/items/nonexistent');
      expect(response.statusCode).toBe(404);
    });
  });
});

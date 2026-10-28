const request = require('supertest');
const app = require('./src/app');

describe('TaskFlow API basics', () => {
  test('GET / returns the welcome message', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('TaskFlow');
    expect(res.body.endpoints.tasks).toBe('/api/tasks');
  });

  test('unknown route returns 404', async () => {
    const res = await request(app).get('/api/this-does-not-exist');

    expect(res.statusCode).toBe(404);
  });
});
const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/Task');

describe('Backend API Integration & CI Tests', () => {
  describe('GET /', () => {
    it('should return welcome message and API meta info', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body.tier).toContain('Tier 2');
    });
  });

  describe('GET /api/health', () => {
    it('should return healthy status for CI/CD smoke testing', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('healthy');
      expect(res.body).toHaveProperty('uptime');
      expect(res.body).toHaveProperty('database');
      expect(res.body).toHaveProperty('system');
    });
  });

  describe('GET /undefined-route', () => {
    it('should return 404 error response for non-existent route', async () => {
      const res = await request(app).get('/api/undefined-endpoint');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('Route Not Found');
    });
  });

  describe('POST /api/tasks (Validation)', () => {
    it('should reject task creation when title is empty', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({
          title: '',
          description: 'No title provided',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Task title is required');
    });
  });

  describe('Task Controller Unit Tests with Mock', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return tasks list from mocked Task.find', async () => {
      const mockTasks = [
        { _id: '123', title: 'Setup Jenkins Pipeline', status: 'completed', priority: 'high' },
        { _id: '456', title: 'Deploy to Production', status: 'in-progress', priority: 'high' },
      ];

      jest.spyOn(Task, 'find').mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockTasks),
      });

      const res = await request(app).get('/api/tasks');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.data[0].title).toBe('Setup Jenkins Pipeline');
    });
  });
});

import request from 'supertest';
import app from '../src/app';
import prisma from '../src/config/database';
import bcrypt from 'bcryptjs';

describe('Auth API', () => {
  let testUserId: string;
  let accessToken: string;
  let refreshToken: string;

  beforeAll(async () => {
    // Clean up test user if exists
    await prisma.user.deleteMany({ where: { email: 'test@breaktime.test' } });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'test@breaktime.test' } });
    await prisma.$disconnect();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@breaktime.test', password: 'Test1234!', fullName: 'Test User', university: 'Test Uni' });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe('test@breaktime.test');
      expect(res.body.data.accessToken).toBeDefined();
      expect(res.body.data.refreshToken).toBeDefined();

      testUserId = res.body.data.user.id;
      accessToken = res.body.data.accessToken;
      refreshToken = res.body.data.refreshToken;
    });

    it('should reject duplicate email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@breaktime.test', password: 'Test1234!', fullName: 'Another User' });

      expect(res.status).toBe(409);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@breaktime.test', password: 'Test1234!' });

      expect(res.status).toBe(200);
      expect(res.body.data.accessToken).toBeDefined();
      accessToken = res.body.data.accessToken;
    });

    it('should reject invalid password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@breaktime.test', password: 'wrongpassword' });

      expect(res.status).toBe(401);
    });

    it('should reject unknown email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'noexist@test.com', password: 'Test1234!' });

      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/users/profile', () => {
    it('should return profile with valid token', async () => {
      const res = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.email).toBe('test@breaktime.test');
    });

    it('should reject without token', async () => {
      const res = await request(app).get('/api/users/profile');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/activities', () => {
    it('should log an activity', async () => {
      const res = await request(app)
        .post('/api/activities')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ activityType: 'steps', value: 500, unit: 'count' });

      expect(res.status).toBe(201);
      expect(res.body.data.pointsEarned).toBeGreaterThan(0);
    });
  });

  describe('GET /api/challenges', () => {
    it('should return daily challenges', async () => {
      const res = await request(app)
        .get('/api/challenges?type=daily')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/leaderboard', () => {
    it('should return global leaderboard', async () => {
      const res = await request(app)
        .get('/api/leaderboard?type=global')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.leaderboard).toBeDefined();
    });
  });

  describe('GET /api/stats', () => {
    it('should return stats for week', async () => {
      const res = await request(app)
        .get('/api/stats?period=week')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.overview).toBeDefined();
    });
  });

  describe('POST /api/auth/refresh', () => {
    it('should refresh tokens', async () => {
      const res = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken });

      expect(res.status).toBe(200);
      expect(res.body.data.accessToken).toBeDefined();
    });
  });

  describe('Health check', () => {
    it('should return ok', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });
});

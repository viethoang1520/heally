// test/limiter.test.js
import request from 'supertest';
import { expect } from 'chai';
import app from '../index';

describe('Rate Limiter Middleware', () => {
  it('should allow 5 requests within the limit', async () => {
    for (let i = 0; i < 5; i++) {
      const res = await request(app).get('/');
      expect(res.status).to.equal(200);
    }
  });

  it('should block requests after reaching the limit', async () => {
    for (let i = 0; i < 5; i++) {
      await request(app).get('/');
    }

    const res = await request(app).get('/');
    expect(res.status).to.equal(429); // HTTP status code 429: Too Many Requests
    expect(res.text).to.include('Too many requests');
  });
});

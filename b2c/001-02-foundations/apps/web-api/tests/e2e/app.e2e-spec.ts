// test/e2e/app.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Web API e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /status → "Hello dear customer"', async () => {
    const res = await request(app.getHttpServer()).get('/status');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello dear customer');
  });
});

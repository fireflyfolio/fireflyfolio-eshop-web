import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import type { INestApplication } from '@nestjs/common';

export async function setupSession(app: INestApplication) {
  // Client Redis (node-redis v4)
  const client = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
  await client.connect();

  // v7.1.1: classe RedisStore (pas de factory)
  const store = new RedisStore({
    client,
    prefix: 'sess:',
  });

  app.use(
    session({
      store,
      secret: process.env.SESSION_SECRET || 'dev_secret_change_me',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,           // mets true derrière un proxy HTTPS
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60,  // 1h
      },
    }),
  );
}

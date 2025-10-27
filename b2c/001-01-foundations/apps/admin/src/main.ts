import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.urlencoded({ extended: true }));
  const port = Number(process.env.ADMIN_PORT) || 3002;
  await app.listen(port);
}

bootstrap();

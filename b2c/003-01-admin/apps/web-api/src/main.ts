import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = new Logger('WEB-API');

  // CORS + Validation globale
  app.enableCors({ origin: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Swagger (à compléter si besoin : security, servers, tags, etc.)
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Web API')
    .setDescription('B2C REST API')
    .setVersion('1.0')
    // .addServer('http://localhost:13001') // ← utile en dev
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const port = Number(process.env.WEB_API_PORT) || 13001;
  await app.listen(port);
  logger.log(`Running on :${port} | Status: /health | Swagger: /docs`);
}

bootstrap();

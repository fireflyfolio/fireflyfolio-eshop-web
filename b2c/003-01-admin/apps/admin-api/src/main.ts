import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true, bufferLogs: true });
  const logger = new Logger('ADMIN-API');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('Admin REST API')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  const port = Number(process.env.ADMIN_API_PORT) || 3001;
  await app.listen(port);
  logger.log(`Running on :${port} - Swagger /docs`);
}

bootstrap();

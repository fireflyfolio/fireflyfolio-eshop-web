import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = new Logger('ADMIN-API');

  const config = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('Admin REST API')
    .setVersion('1.0')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  const port = Number(process.env.ADMIN_API_PORT) || 3000;
  await app.listen(port);
  logger.log(`Running on :${port} - Swagger /docs`);
}
bootstrap();

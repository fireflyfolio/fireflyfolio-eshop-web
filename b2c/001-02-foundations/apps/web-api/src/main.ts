import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = new Logger('WEB-API');

  const config = new DocumentBuilder()
    .setTitle('Web API')
    .setDescription('B2C REST API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = Number(process.env.WEB_API_PORT) || 3000;
  await app.listen(port);
  logger.log(`Running on :${port} - Swagger /docs`);
}

bootstrap();

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { StatusController } from './status.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ADMIN_API_PORT: Joi.number().default(3001)
      })
    })
  ],
  controllers: [StatusController]
})
export class AppModule { }

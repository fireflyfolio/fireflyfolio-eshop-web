import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AuthController } from './auth.controller';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ADMIN_PORT: Joi.number().default(3002),
        REDIS_URL: Joi.string().uri().required(),
        ADMIN_LOGIN: Joi.string().default('admin'),
        ADMIN_PASSWORD: Joi.string().default('admin'),
        SESSION_SECRET: Joi.string().default('dev_secret_change_me'),
        DATABASE_URL: Joi.string().uri().required(),
      }),
    }),
  ],
  controllers: [AuthController, DashboardController],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { StatusController } from './status.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        API_PORT: Joi.number().default(3001),
        DATABASE_URL: Joi.string().uri().required(),
      }),
    }),
  ],
  controllers: [StatusController],
  providers: [],
})
export class AppModule { }

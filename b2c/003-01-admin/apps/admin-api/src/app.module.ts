import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { PrismaModule } from './shared/infra/prisma/prisma.module';
import { RedisModule } from './shared/infra/redis/redis.module';
import { StatusController } from './status.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WelcomeModule } from './welcome/welcome.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env', '../.env', '../../.env'],
    }),
    PrismaModule,
    RedisModule,
    UsersModule,
    AuthModule,
    WelcomeModule,
  ],
  controllers: [StatusController]
})
export class AppModule { }

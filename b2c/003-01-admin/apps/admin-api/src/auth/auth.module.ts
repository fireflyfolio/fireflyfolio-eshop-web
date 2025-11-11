import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './app/auth.service';
import { JwtStrategy } from './app/jwt.strategy';
import { AuthController } from './interface/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get<string>('jwt.secret')!,
        // jsonwebtoken accepte string p.ex. '1h' ou un nombre (secondes)
        signOptions: { expiresIn: (cfg.get<string>('jwt.expiresIn') ?? '1h') as any },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { RedisService } from '../../shared/infra/redis/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly redis: RedisService,
    private readonly config: ConfigService,
  ) {
    const secret = config.get<string>('jwt.secret');
    if (!secret) throw new Error('JWT secret not configured');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    const jti = payload?.jti;
    if (!jti) return null;

    const blacklisted = await this.redis.isBlacklisted(jti);
    if (blacklisted) return null;

    return payload; // req.user
  }
}

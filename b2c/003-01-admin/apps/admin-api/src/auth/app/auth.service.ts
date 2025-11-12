import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';

import { UserUseCases } from '../../users/app/user.usecases';
import { RedisService } from '../../shared/infra/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private users: UserUseCases,
    private jwt: JwtService,
    private redis: RedisService,
  ) { }

  async login(login: string, password: string) {
    const user = await this.users.validateCredentials(login, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const jti = uuid();
    const payload = { sub: user.id, login: user.login, jti, dn: user.displayName };

    const token = await this.jwt.signAsync(payload, { jwtid: jti });
    const decoded: any = this.jwt.decode(token);

    return { accessToken: token, exp: decoded?.exp, jti };
  }

  async logout(jti: string, exp: number) {
    await this.redis.blacklistToken(jti, exp);
    return { ok: true };
  }
}

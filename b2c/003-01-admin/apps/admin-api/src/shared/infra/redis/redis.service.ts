import Redis from 'ioredis';
import { Injectable, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private client = new Redis(process.env.REDIS_URL!);

  async blacklistToken(jti: string, exp: number) {
    const ttl = Math.max(exp - Math.floor(Date.now() / 1000), 1);
    await this.client.set(`bl:${jti}`, '1', 'EX', ttl);
  }

  async isBlacklisted(jti: string): Promise<boolean> {
    return (await this.client.exists(`bl:${jti}`)) === 1;
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}

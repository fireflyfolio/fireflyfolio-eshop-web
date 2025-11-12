import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

import { UserRepository } from '../infra/user.repository';

@Injectable()
export class UserUseCases {
  constructor(private users: UserRepository) { }

  async validateCredentials(login: string, password: string) {
    const user = await this.users.findByLogin(login);
    if (!user) return null;

    const ok = await argon2.verify(user.passwordHash, password);
    return ok ? user : null;
  }
}

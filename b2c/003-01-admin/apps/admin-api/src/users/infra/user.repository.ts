import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { UserModel } from '../domain/user.model';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) { }

  findByLogin(login: string): Promise<UserModel | null> {
    return this.prisma.user.findUnique({ where: { login } });
  }

  createUser(data: Partial<UserModel>) {
    return this.prisma.user.create({ data: data as any });
  }
}

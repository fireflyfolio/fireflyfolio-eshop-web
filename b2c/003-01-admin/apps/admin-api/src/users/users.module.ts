import { Module } from '@nestjs/common';

import { UserRepository } from './infra/user.repository';
import { UserUseCases } from './app/user.usecases';

@Module({
  providers: [UserRepository, UserUseCases],
  exports: [UserRepository, UserUseCases]
})
export class UsersModule { }

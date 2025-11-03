import { Module } from '@nestjs/common';

import { PagesController } from '../adapters/http/pages.controller';
import { InMemoryCategoryRepository } from '../adapters/persistence/inMemory.repository';

@Module({
  controllers: [PagesController],
  providers: [InMemoryCategoryRepository]
})
export class PagesModule { }

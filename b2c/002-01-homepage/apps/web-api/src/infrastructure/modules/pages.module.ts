import { Module } from '@nestjs/common';
import { PagesController } from '../adapters/http/pages.controller.js';
import { InMemoryCategoryRepository } from '../adapters/persistence/inMemory.repository.js';

@Module({
  controllers: [PagesController],
  providers: [InMemoryCategoryRepository]
})
export class PagesModule { }

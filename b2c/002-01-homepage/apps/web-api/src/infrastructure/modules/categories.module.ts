import { Module } from '@nestjs/common';

import { CategoriesController } from '../adapters/http/categories.controller.js';
import { InMemoryCategoryRepository } from '../adapters/persistence/inMemory.repository.js';
import { ListCategoriesUseCase } from '../../application/usecases/ListCategories.js';
import { TOKENS } from '../tokens.js';

@Module({
  controllers: [CategoriesController],
  providers: [
    { provide: TOKENS.CategoryRepository, useClass: InMemoryCategoryRepository },
    ListCategoriesUseCase
  ]
})
export class CategoriesModule { }

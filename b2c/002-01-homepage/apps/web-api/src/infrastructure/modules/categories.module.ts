import { Module } from '@nestjs/common';

import { CategoriesController } from '../adapters/http/categories.controller';
import { InMemoryCategoryRepository } from '../adapters/persistence/inMemory.repository';
import { ListCategoriesUseCase } from '../../application/usecases/ListCategories';
import { TOKENS } from '../tokens';

@Module({
  controllers: [CategoriesController],
  providers: [
    { provide: TOKENS.CategoryRepository, useClass: InMemoryCategoryRepository },
    ListCategoriesUseCase
  ]
})
export class CategoriesModule { }

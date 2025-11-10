import { Module } from '@nestjs/common';

import { ProductsController } from '../adapters/http/products.controller';
import { InMemoryProductRepository, InMemoryCategoryRepository } from '../adapters/persistence/inMemory.repository';
import { TOKENS } from '../tokens';
import { ListProductsUseCase } from '../../application/usecases/ListProducts';
import { GetProductUseCase } from '../../application/usecases/GetProduct';

@Module({
  controllers: [ProductsController],
  providers: [
    { provide: TOKENS.ProductRepository, useClass: InMemoryProductRepository },
    { provide: TOKENS.CategoryRepository, useClass: InMemoryCategoryRepository },
    ListProductsUseCase,
    GetProductUseCase,
  ],
  exports: [
    { provide: TOKENS.ProductRepository, useClass: InMemoryProductRepository },
    { provide: TOKENS.CategoryRepository, useClass: InMemoryCategoryRepository },
  ]
})
export class ProductsModule { }

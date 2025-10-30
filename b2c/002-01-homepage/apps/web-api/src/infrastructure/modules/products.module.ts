import { Module } from '@nestjs/common';

import { ProductsController } from '../adapters/http/products.controller.js';
import { InMemoryProductRepository, InMemoryCategoryRepository } from '../adapters/persistence/inMemory.repository.js';
import { TOKENS } from '../tokens';
import { ListProductsUseCase } from '../../application/usecases/ListProducts.js';
import { GetProductUseCase } from '../../application/usecases/GetProduct.js';

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

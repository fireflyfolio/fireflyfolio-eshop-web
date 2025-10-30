import { Module } from '@nestjs/common';

import { HealthModule } from '../src/infrastructure/modules/health.module.js';
import { ProductsModule } from '../src/infrastructure/modules/products.module.js';
import { CategoriesModule } from '../src/infrastructure/modules/categories.module.js';
import { PagesModule } from '../src/infrastructure/modules/pages.module.js';

@Module({
  imports: [HealthModule, ProductsModule, CategoriesModule, PagesModule]
})
export class AppModule { }

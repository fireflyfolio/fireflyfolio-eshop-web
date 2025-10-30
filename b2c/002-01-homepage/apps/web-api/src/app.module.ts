import { Module } from '@nestjs/common';

import { HealthModule } from './infrastructure/modules/health.module.js';
import { ProductsModule } from './infrastructure/modules/products.module.js';
import { CategoriesModule } from './infrastructure/modules/categories.module.js';
import { PagesModule } from './infrastructure/modules/pages.module.js';

@Module({
  imports: [HealthModule, ProductsModule, CategoriesModule, PagesModule]
})
export class AppModule { }

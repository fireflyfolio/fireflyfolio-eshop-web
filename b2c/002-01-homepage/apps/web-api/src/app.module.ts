import { Module } from '@nestjs/common';

import { HealthModule } from './infrastructure/modules/health.module';
import { ProductsModule } from './infrastructure/modules/products.module';
import { CategoriesModule } from './infrastructure/modules/categories.module';
import { PagesModule } from './infrastructure/modules/pages.module';

@Module({
  imports: [HealthModule, ProductsModule, CategoriesModule, PagesModule]
})
export class AppModule { }

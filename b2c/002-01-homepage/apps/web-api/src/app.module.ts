import { Module } from '@nestjs/common';
import { HealthModule } from '@infra/modules/health.module.js';
import { ProductsModule } from '@infra/modules/products.module.js';
import { CategoriesModule } from '@infra/modules/categories.module.js';
import { PagesModule } from '@infra/modules/pages.module.js';

@Module({ imports: [HealthModule, ProductsModule, CategoriesModule, PagesModule] })
export class AppModule { }

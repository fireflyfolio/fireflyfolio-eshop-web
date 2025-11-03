import { Controller, Get, Param, Query } from '@nestjs/common';
import { ListProductsUseCase } from '../../../application/usecases/ListProducts';
import { GetProductUseCase } from '../../../application/usecases/GetProduct';
import { ListProductsQuery } from './dto/list-products.query';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly listProducts: ListProductsUseCase,
    private readonly getProduct: GetProductUseCase,
  ) { }

  @Get()
  list(@Query() q: ListProductsQuery) {
    const { items, total } = this.listProducts.exec(q);
    return { items, total, page: q.page, pageSize: q.pageSize };
  }

  @Get(':slug')
  bySlug(@Param('slug') slug: string) {
    return this.getProduct.exec(slug);
  }
}

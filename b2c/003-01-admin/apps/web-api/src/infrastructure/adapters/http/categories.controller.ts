import { Controller, Get } from '@nestjs/common';

import { ListCategoriesUseCase } from '../../../application/usecases/ListCategories';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly listCategories: ListCategoriesUseCase) { }
  @Get() list() { return this.listCategories.exec(); }
}

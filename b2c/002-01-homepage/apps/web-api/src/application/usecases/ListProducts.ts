import { Injectable, Inject } from '@nestjs/common';
import { ProductRepository, ListParams } from '@app/ports/ProductRepository.js';
import { TOKENS } from '@infra/tokens.js';

@Injectable()
export class ListProductsUseCase {
  constructor(@Inject(TOKENS.ProductRepository) private readonly repo: ProductRepository) { }

  exec(params: ListParams) {
    return this.repo.search(params);
  }
}

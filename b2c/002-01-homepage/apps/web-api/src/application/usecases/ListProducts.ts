import { Injectable, Inject } from '@nestjs/common';

import type { ProductRepository, ListParams } from '../ports/ProductRepository.js';
import { TOKENS } from '../../infrastructure/tokens.js';

@Injectable()
export class ListProductsUseCase {
  constructor(@Inject(TOKENS.ProductRepository) private readonly repo: ProductRepository) { }

  exec(params: ListParams) {
    return this.repo.search(params);
  }
}

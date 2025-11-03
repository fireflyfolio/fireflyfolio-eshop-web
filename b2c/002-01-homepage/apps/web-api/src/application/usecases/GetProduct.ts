import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import type { ProductRepository } from '../ports/ProductRepository';
import { TOKENS } from '../../infrastructure/tokens';

@Injectable()
export class GetProductUseCase {
  constructor(@Inject(TOKENS.ProductRepository) private readonly repo: ProductRepository) { }

  exec(slug: string) {
    const p = this.repo.bySlug(slug);
    if (!p) throw new NotFoundException('not_found');
    return p;
  }
}

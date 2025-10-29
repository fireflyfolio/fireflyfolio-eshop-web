import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '@app/ports/ProductRepository.js';
import { TOKENS } from '@infra/tokens.js';

@Injectable()
export class GetProductUseCase {
  constructor(@Inject(TOKENS.ProductRepository) private readonly repo: ProductRepository) { }
  
  exec(slug: string) {
    const p = this.repo.bySlug(slug);
    if (!p) throw new NotFoundException('not_found');
    return p;
  }
}

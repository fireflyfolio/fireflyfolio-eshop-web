import { Injectable, Inject } from '@nestjs/common';

import type { CategoryRepository } from '../ports/CategoryRepository.js';
import { TOKENS } from '../../infrastructure/tokens.js';

@Injectable()
export class ListCategoriesUseCase {
  constructor(@Inject(TOKENS.CategoryRepository) private readonly repo: CategoryRepository) { }

  exec() { return this.repo.list(); }
}

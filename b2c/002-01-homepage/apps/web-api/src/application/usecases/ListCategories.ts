import { Injectable, Inject } from '@nestjs/common';
import { CategoryRepository } from '@app/ports/CategoryRepository.js';
import { TOKENS } from '@infra/tokens.js';

@Injectable()
export class ListCategoriesUseCase {
  constructor(@Inject(TOKENS.CategoryRepository) private readonly repo: CategoryRepository) { }

  exec() { return this.repo.list(); }
}

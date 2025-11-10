import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { InMemoryCategoryRepository } from '../persistence/inMemory.repository';

@Controller('pages')
export class PagesController {
  // Pour la démo simple, on réutilise le repo catégorie (static pages)
  constructor(private readonly cats: InMemoryCategoryRepository) { }

  @Get(':slug')
  get(@Param('slug') slug: 'cgu' | 'privacy' | 'cookies' | 'about') {
    const page = this.cats.pageBySlug(slug);
    if (!page) throw new NotFoundException('not_found');
    return page;
  }
}

import { Controller, Get } from '@nestjs/common';

@Controller()
export class StatusController {
  @Get('status') status(): string {
    return 'Hello dear customer';
  }
}

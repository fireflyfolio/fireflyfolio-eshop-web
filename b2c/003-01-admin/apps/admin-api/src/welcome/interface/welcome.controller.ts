import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/app/jwt-auth.guard';

@Controller('welcome')
export class WelcomeController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getWelcome(@Req() req: any) {
    return { message: `Welcome, ${req.user.dn}!` };
  }
}

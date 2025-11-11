import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

import { AuthService } from '../app/auth.service';
import { JwtAuthGuard } from '../app/jwt-auth.guard';

class LoginDto {
  @IsNotEmpty()
  login!: string;
  @IsNotEmpty()
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) { }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.login, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req: any, @Body('exp') exp?: number) {
    // Accept exp from body as well (frontend sends it)
    const e = exp ?? req.user?.exp;
    return this.auth.logout(req.user.jti, e);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return { id: req.user.sub, login: req.user.login, displayName: req.user.dn };
  }
}

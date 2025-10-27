import { Controller, Get, Post, Body, Res, Session } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('login')
  loginPage(): string {
    return `
      <html><body style="font-family: sans-serif">
        <h1>Admin Login</h1>
        <form method="POST" action="/auth/login">
          <div><label>Login: <input name="login" /></label></div>
          <div><label>Password: <input type="password" name="password" /></label></div>
          <button type="submit">Sign in</button>
        </form>
      </body></html>
    `;
  }

  @Post('login')
  async doLogin(
    @Body() body: any,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    const login = (body?.login || '').toString();
    const password = (body?.password || '').toString();
    const expectedLogin = process.env.ADMIN_LOGIN || 'admin';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin';

    if (login === expectedLogin && password === expectedPassword) {
      session.user = { login };
      return res.redirect('/dashboard');
    }
    return res.status(401).send('Invalid credentials');
  }

  @Post('logout')
  async logout(@Session() session: Record<string, any>, @Res() res: Response) {
    session.destroy(() => { });
    res.redirect('/auth/login');
  }
}

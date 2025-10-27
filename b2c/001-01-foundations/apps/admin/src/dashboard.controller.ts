import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller()
export class DashboardController {
  @UseGuards(AuthGuard)
  @Get('dashboard')
  page(): string {
    return `
      <html><body style="font-family: sans-serif">
        <h1>Hello dear manager</h1>
        <form method="POST" action="/auth/logout"><button type="submit">Logout</button></form>
      </body></html>
    `;
  }
}

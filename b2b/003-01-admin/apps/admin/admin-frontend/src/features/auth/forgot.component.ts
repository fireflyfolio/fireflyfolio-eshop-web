import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'admin-forgot',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
  <div class="card">
    <h2>Forgot password</h2>
    <div class="ok" *ngIf="sent">If the email exists, a reset link has been sent.</div>
    <form (ngSubmit)="submit()">
      <input [(ngModel)]="email" name="email" type="email" placeholder="Email" required>
      <button type="submit">Send reset link</button>
    </form>
    <p><a routerLink="/login">Back to sign in</a></p>
  </div>`,
  styles: [`
  .card{max-width:420px;margin:10vh auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;padding:1.2rem;color:#0f172a}
  .err{color:#b91c1c;margin-top:.6rem}
  .ok{color:#047857;margin:.6rem 0}
`]
})
export class ForgotComponent {
  email = ''; sent = false;

  constructor(private auth: AuthService) { }

  async submit() {
    await this.auth.forgot(this.email);
    this.sent = true;
  }
}

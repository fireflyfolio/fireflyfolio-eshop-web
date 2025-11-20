import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { RouterLink } from '@angular/router';

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
  .card{max-width:420px;margin:10vh auto;background:#0b1226;border:1px solid #1f2937;border-radius:14px;padding:1.2rem;color:#e5e7eb}
  input{width:100%;margin:.5rem 0;padding:.7rem .9rem;border-radius:10px;border:1px solid #243041;background:#0f172a;color:#e5e7eb}
  button{padding:.7rem 1rem;border:0;background:#16a34a;color:white;border-radius:10px;font-weight:600;cursor:pointer}
  .ok{color:#34d399;margin:.6rem 0}`]
})
export class ForgotComponent {
  email = ''; sent = false;

  constructor(private auth: AuthService) { }

  async submit() {
    await this.auth.forgot(this.email);
    this.sent = true;
  }
}

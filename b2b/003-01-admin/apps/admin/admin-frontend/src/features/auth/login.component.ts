import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'admin-login',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
  <div class="card">
    <h2>Sign in</h2>
    <p>Demo account: <code>admin@admin</code> / <code>admin</code></p>
    <form (ngSubmit)="submit()">
      <input [(ngModel)]="email" name="email" type="email" placeholder="Email" required>
      <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required>
      <button type="submit">Sign in</button>
    </form>
    <p><a routerLink="/forgot">Forgot password?</a></p>
    <div class="err" *ngIf="error">Invalid credentials.</div>
  </div>`,
  styles: [`
  .card{max-width:420px;margin:10vh auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;padding:1.2rem;color:#0f172a}
  .err{color:#b91c1c;margin-top:.6rem}
  .ok{color:#047857;margin:.6rem 0}
`]
})
export class LoginComponent {
  email = ''; password = ''; error = false;

  constructor(private auth: AuthService, private router: Router) { }

  async submit() {
    this.error = false;
    try { await this.auth.login(this.email, this.password); this.router.navigateByUrl('/'); }
    catch { this.error = true; }
  }
}

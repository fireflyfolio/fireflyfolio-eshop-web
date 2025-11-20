import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router, RouterLink } from '@angular/router';

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
  .card{max-width:420px;margin:10vh auto;background:#0b1226;border:1px solid #1f2937;border-radius:14px;padding:1.2rem;color:#e5e7eb}
  input{width:100%;margin:.5rem 0;padding:.7rem .9rem;border-radius:10px;border:1px solid #243041;background:#0f172a;color:#e5e7eb}
  button{padding:.7rem 1rem;border:0;background:#3b82f6;color:white;border-radius:10px;font-weight:600;cursor:pointer}
  .err{color:#fca5a5;margin-top:.6rem}`]
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

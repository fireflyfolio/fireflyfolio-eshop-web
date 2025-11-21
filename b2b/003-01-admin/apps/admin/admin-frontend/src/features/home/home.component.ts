import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  template: `
  <div class="page">
    <div class="crumbs">Home / Dashboard</div>
    <div class="card"><h2>Welcome</h2><p>Hello, {{user() || 'Admin'}} — glad to see you!</p></div>
  </div>`,
  imports: [CommonModule],
  styles: [`.page{padding:1rem}.crumbs{color:#94a3b8}.card{background:#0b1226;border:1px solid #1f2937;border-radius:14px;padding:1rem;color:#e5e7eb}`]
})
export class HomeComponent {
  user = computed(() => this.auth.userEmail());

  constructor(private auth: AuthService){}
}

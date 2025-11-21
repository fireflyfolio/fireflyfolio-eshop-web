import { Component, computed, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  collapsed = signal(false);
  
  user = computed(() => this.auth.userEmail());

  constructor(private auth: AuthService) {}

  toggle() { this.collapsed.update(v => !v); }
  async logout() { await this.auth.logout(); location.href = '/login'; }
}

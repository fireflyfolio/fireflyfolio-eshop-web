import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
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
  collapsed = false;

  constructor(private auth: AuthService, private router: Router) {}

  user()  { return this.auth.userEmail(); } // signal -> string | null
  isAuth(){ return this.auth.isAuth(); }    // signal -> boolean

  toggle(){ this.collapsed = !this.collapsed; }
  async logout(){ await this.auth.logout(); this.router.navigateByUrl('/login'); }
}

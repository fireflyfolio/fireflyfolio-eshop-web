import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userEmail = signal<string | null>(null);
  isAuth = computed(() => !!this.userEmail());

  constructor(private http: HttpClient) {}

  async me() {
    const me: any = await firstValueFrom(this.http.get('/api/auth/me'));
    this.userEmail.set(me?.authenticated ? me.email : null);
    return !!me?.authenticated;
  }
  async login(email: string, password: string) {
    await firstValueFrom(this.http.post('/api/auth/login', { email, password }));
    await this.me();
    this.userEmail.set(email);
  }
  async logout() {
    await firstValueFrom(this.http.post('/api/auth/logout', {}));
    this.userEmail.set(null);
  }
  async forgot(email: string) {
    await firstValueFrom(this.http.post('/api/auth/forgot-password', { email }));
  }
}

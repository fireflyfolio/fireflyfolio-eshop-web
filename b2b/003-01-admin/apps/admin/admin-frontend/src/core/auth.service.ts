import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userEmail = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  async me() {
    const me: any = await this.http.get('/api/auth/me').toPromise();
    this.userEmail.set(me?.email ?? null);
    return !!me?.authenticated;
  }

  async login(email: string, password: string) {
    await this.http.post('/api/auth/login', { email, password }).toPromise();
    this.userEmail.set(email);
  }

  async logout() {
    await this.http.post('/api/auth/logout', {}).toPromise();
    this.userEmail.set(null);
  }

  async forgot(email: string) {
    await this.http.post('/api/auth/forgot-password', { email }).toPromise();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Vendor { id: number; email: string; name: string | null; enabled: boolean; }

@Injectable({ providedIn: 'root' })
export class VendorsService {
  constructor(private http: HttpClient) {}
  list() { return this.http.get<Vendor[]>('/api/vendors'); }
}

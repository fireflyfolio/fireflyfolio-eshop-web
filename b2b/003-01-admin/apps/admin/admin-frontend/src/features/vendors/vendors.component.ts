import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsService, Vendor } from './vendors.service';

@Component({
  standalone: true,
  template: `
  <div class="page">
    <div class="crumbs">Home / Vendors</div>
    <div class="card">
      <h2>Vendors</h2>
      <table class="tbl" *ngIf="vendors">
        <thead><tr><th>ID</th><th>Email</th><th>Name</th><th>Enabled</th></tr></thead>
        <tbody>
          <tr *ngFor="let v of vendors">
            <td>{{v.id}}</td><td>{{v.email}}</td><td>{{v.name || '-'}}</td><td>{{v.enabled ? 'Yes' : 'No'}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>`,
  imports: [CommonModule],
  styles: [`.page{padding:1rem}.crumbs{color:#94a3b8}.card{background:#0b1226;border:1px solid #1f2937;border-radius:14px;padding:1rem;color:#e5e7eb}
  .tbl{width:100%;border-collapse:collapse;margin-top:.6rem}
  .tbl th,.tbl td{border:1px solid #243041;padding:.6rem;text-align:left}`]
})
export class VendorsComponent implements OnInit {
  vendors: Vendor[] | null = null;

  constructor(private api: VendorsService) {}

  ngOnInit() {
    this.api.list().subscribe(v => this.vendors = v);
  }
}

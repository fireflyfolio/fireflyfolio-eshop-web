import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('admin-frontend');

  out = '...';
  async call() {
    const res = await fetch('/api/status');
    this.out = await res.text();
  }
}

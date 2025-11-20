import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withCredentials } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './ui/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withCredentials()) // send/receive session cookie
  ]
}).catch(err => console.error(err));

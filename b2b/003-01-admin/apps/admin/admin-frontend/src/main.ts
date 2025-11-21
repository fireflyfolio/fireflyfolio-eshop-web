import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AppComponent } from './ui/app.component';
import { credentialsInterceptor } from './core/with-credentials.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([credentialsInterceptor])
    )
  ]
}).catch(err => console.error(err));

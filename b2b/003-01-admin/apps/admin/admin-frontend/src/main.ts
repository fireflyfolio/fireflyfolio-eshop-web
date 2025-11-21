import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAppInitializer, inject } from '@angular/core';

import { routes } from './app.routes';
import { AppComponent } from './ui/app.component';
import { credentialsInterceptor } from './core/with-credentials.interceptor';
import { AuthService } from './core/auth.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([credentialsInterceptor])),

    provideAppInitializer(() => {
      const auth = inject(AuthService);
      return auth.me().catch(() => false);
    }),
  ]
}).catch(err => console.error(err));

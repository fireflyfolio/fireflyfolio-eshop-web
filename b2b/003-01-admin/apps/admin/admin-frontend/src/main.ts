import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAppInitializer, inject } from '@angular/core';

import { routes } from './app.routes';
import { AppComponent } from './ui/app.component';
import { AuthService } from './core/auth.service';
import { credentialsInterceptor } from './core/with-credentials.interceptor';
import { auth401Interceptor } from './core/auth-401.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([credentialsInterceptor, auth401Interceptor])),

    provideAppInitializer(() => {
      const auth = inject(AuthService);
      return auth.me().catch(() => false);
    }),
  ]
}).catch(err => console.error(err));

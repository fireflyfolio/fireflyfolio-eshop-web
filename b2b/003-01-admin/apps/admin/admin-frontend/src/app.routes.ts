import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { ForgotComponent } from './features/auth/forgot.component';
import { HomeComponent } from './features/home/home.component';
import { VendorsComponent } from './features/vendors/vendors.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: '', canActivate: [authGuard], children: [
      { path: '', component: HomeComponent },
      { path: 'vendors', component: VendorsComponent }
  ]},
  { path: '**', redirectTo: '' }
];

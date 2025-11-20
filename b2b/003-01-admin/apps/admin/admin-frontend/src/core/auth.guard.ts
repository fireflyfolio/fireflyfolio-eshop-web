import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const ok = await auth.me().catch(() => false);
  if (!ok) {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};

import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  // clone request to ensure withCredentials=true
  const cloned = req.clone({ withCredentials: true });
  return next(cloned);
};

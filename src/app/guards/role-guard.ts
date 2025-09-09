import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole'];

  if (auth.isLoggedIn() && auth.role === expectedRole) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

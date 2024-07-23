import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'];
  const roles = authService.getRoles();

  console.log('Expected Role:', expectedRole); // Debugging
  console.log('User Roles:', roles); // Debugging

  if (!roles.includes(expectedRole)) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

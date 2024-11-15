import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const reporteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']); 
    return false; 
  }
  const userRole = authService.getUserRole();
  if (userRole !== 'CUSTOMER') { 
    router.navigate(['/unauthorized']); 
    return false; 
  }

  return true; 
};

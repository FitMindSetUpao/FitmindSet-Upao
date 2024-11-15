import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const reporteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica si el usuario está autenticado
  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']); // Redirige al login
    return false; // Bloquea el acceso
  }

  // Verifica el rol del usuario si es necesario
  const userRole = authService.getUserRole();
  if (userRole !== 'CUSTOMER') { // Cambia 'CLIENTE' por el rol apropiado
    router.navigate(['/unauthorized']); // Redirige a una página de acceso denegado
    return false; // Bloquea el acceso
  }

  return true; // Permite el acceso
};

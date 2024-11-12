import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Cambia `isAuthenticated` por una validación real (ej. revisar un token en el localStorage).
    const isAuthenticated = true; // Esto debería basarse en una condición real de autenticación.

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

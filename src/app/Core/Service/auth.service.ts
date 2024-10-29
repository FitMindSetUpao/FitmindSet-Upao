// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '';

  constructor(private http: HttpClient, private router: Router) { }

  sendRecoveryEmail(email: string): Observable<any> {
    return this.http.post(this.apiUrl, { email });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); // Simulación de autenticación basada en token
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Remueve el token del almacenamiento
    this.router.navigate(['/login']); // Redirige al login
  }
}

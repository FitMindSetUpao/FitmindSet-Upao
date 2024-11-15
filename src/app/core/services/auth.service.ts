import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage.services';
import { AuthRequest } from '../../shared/models/auth-request.model';
import { AuthResponse } from '../../shared/models/auth-response.model';
import { Observable, tap } from 'rxjs';
import { RegisterRequest } from '../../shared/models/register-request.model';
import { RegisterResponse } from '../../shared/models/register-response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = `${environment.baseURL}/auth`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private router = inject(Router);

  constructor() { }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseURL}/login`, authRequest)
      .pipe(
        tap(response => this.storageService.setAuthData(response))
      );
  }

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseURL}/register/customer`, registerRequest)
      .pipe(
        tap(response => {
          this.storageService.setUserName(registerRequest.nombre);
        })
      );
  }

  logout(): void {
    this.storageService.clearAuthData();
    this.storageService.clearUserName(); 
    this.router.navigate(['/auth/login']);
  }
  sendRecoveryEmail(correo: string): Observable<any> {
    return this.http.post(`${this.baseURL}/forgot-password`, { correo });
  }
  

  isAuthenticated(): boolean {
    return this.storageService.getAuthData() !== null;
  }

  getUser(): AuthResponse | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData : null;
  }

  getUserRole(): string | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData.rol : null;
  }

  getUserName(): string | null {
    return this.storageService.getUserName(); 
  }
  loginWithGoogle(googleToken: string): Observable<any> {
    return this.http.post('login/oauth2/code/google', { token: googleToken });
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    const url = `${this.baseURL}/reset-password`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // Crea el objeto que contiene el token y la nueva contraseña
    const body = {
      token: token,
      newPassword: newPassword
    };
  
    // Envía el objeto como el cuerpo de la solicitud
    return this.http.post(url, body, { headers: headers });
  }
  
}

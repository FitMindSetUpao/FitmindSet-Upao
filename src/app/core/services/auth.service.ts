import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.services';
import { AuthRequest } from '../../shared/models/auth-request.model';
import { AuthResponse } from '../../shared/models/auth-response.model';
import { Observable, tap } from 'rxjs';
import { RegisterRequest } from '../../shared/models/register-request.model';
import { RegisterResponse } from '../../shared/models/register-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = `${environment.baseURL}/auth`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

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
          // Almacenar el nombre del usuario en el almacenamiento local
          this.storageService.setUserName(registerRequest.nombre);
        })
      );
  }

  logout(): void {
    this.storageService.clearAuthData();
    this.storageService.clearUserName(); // Limpiar el nombre al cerrar sesión
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
    return this.http.post('/api/auth/google-login', { token: googleToken });
  }
  
  
}

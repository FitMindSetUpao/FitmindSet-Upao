import { Injectable } from '@angular/core';
import { AuthResponse } from '../../shared/models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private authDataKey = 'authData';
  private userNameKey = 'nombre'; // Clave para almacenar el nombre

  setAuthData(authData: AuthResponse): void {
    localStorage.setItem('authData', JSON.stringify(authData));
  }

  getAuthData(): AuthResponse | null {
    const authData = localStorage.getItem(this.authDataKey);
    return authData ? JSON.parse(authData) : null;
  }

  clearAuthData(): void {
    localStorage.removeItem(this.authDataKey);
  }

  setUserName(nombre: string): void {
    localStorage.setItem(this.userNameKey, nombre); // Almacenar el nombre
  }

  getUserName(): string | null {
    return localStorage.getItem(this.userNameKey); // Obtener el nombre
  }

  clearUserName(): void {
    localStorage.removeItem(this.userNameKey); // Limpiar el nombre
  }
}

import { Injectable } from '@angular/core';
import { AuthResponse } from '../../shared/models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  private authDataKey = 'fitmindset_auth';
  private userNameKey = 'nombre'; // Clave para almacenar el nombre

  setAuthData(authData: AuthResponse): void {
    localStorage.setItem(this.authDataKey, JSON.stringify(authData));
  }

  getAuthData(): AuthResponse | null {
    const data = localStorage.getItem(this.authDataKey);
    return data ? (JSON.parse(data) as AuthResponse) : null;
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

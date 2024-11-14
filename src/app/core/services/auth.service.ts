// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post('/api/login', credentials).subscribe((response: any) => {
      localStorage.setItem('token', response.token); // Asegúrate de almacenar el token aquí
    });
  }
}

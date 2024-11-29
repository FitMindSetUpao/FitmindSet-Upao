import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.baseURL;

  constructor(private http: HttpClient, private router: Router) {}

  sendRecoveryEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/password-recovery`, { email });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  resetPassword(newPassword: string): Observable<any> {
    const url = `${this.apiUrl}/password-reset`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(url, newPassword, { headers: headers });
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../../shared/models/user-profile.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private baseURL = `${environment.baseURL}/user`;
  private http = inject(HttpClient);
  private router = inject(Router);

  getUserProfile(usercorreo: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseURL}/mi-perfil`);
  }

  updateUserProfile(profileData: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.baseURL}/mi-perfil/actualizar`, profileData);
  }
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/me`);
  }
  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }


}

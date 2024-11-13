// src/app/core/services/notification-http.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

export interface NotificationPreferences {
  email: string;
  preference: string; // El tipo de preferencia o frecuencia de notificación
}

@Injectable({ providedIn: 'root' })
export class NotificationHttpService {
  private baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  // Método para enviar preferencias al backend
  setNotificationPreference(preferences: NotificationPreferences): Observable<any> {
    const url = `${this.baseURL}/notificaciones/preferences`;
    return this.http.post(url, preferences);
  }
}

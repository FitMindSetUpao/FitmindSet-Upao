import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';

export interface Preference {
  label: string;
  description: string;
  enabled: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationPreferencesService {
  private readonly NOTIFICATIONS_KEY = 'desktopNotifications';
  private readonly PREFERENCES_KEY = 'preferences';

  constructor(private http: HttpClient) {}

  getDesktopNotifications(): boolean {
    return JSON.parse(localStorage.getItem(this.NOTIFICATIONS_KEY) || 'false');
  }

  setDesktopNotifications(status: boolean): void {
    localStorage.setItem(this.NOTIFICATIONS_KEY, JSON.stringify(status));
  }

  getPreferences(): Preference[] {
    const savedPreferences = localStorage.getItem(this.PREFERENCES_KEY);
    return savedPreferences
      ? JSON.parse(savedPreferences)
      : [
          { label: 'Recordatorio para tomar agua', description: 'Recibe notificaciones para hidratarte cada hora.', enabled: false },
          { label: 'Recordatorio para ejercitarte', description: 'Recibe notificaciones diarias para realizar ejercicio.', enabled: false },
          { label: 'Recordatorio para caminar', description: 'Recibe notificaciones para dar un paseo y despejarte.', enabled: false },
        ];
  }

  setPreferences(preferences: Preference[]): void {
    localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(preferences));
  }

  // Nueva función para enviar preferencias al backend
  sendPreferencesToBackend(email: string, frequency: string): Observable<any> {
    const url = `${environment.baseURL}/notificaciones/preferences`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, { email, preference: frequency }, { headers });
  }
}

// src/app/core/services/notification-preferences.service.ts
import { Injectable } from '@angular/core';

export interface Preference {
  label: string;
  description: string;
  enabled: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationPreferencesService {
  private readonly NOTIFICATIONS_KEY = 'desktopNotifications';
  private readonly PREFERENCES_KEY = 'preferences';

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
          { label: 'Recordatorio para caminar', description: 'Recibe notificaciones para dar un paseo y despejarte.', enabled: false }
        ];
  }

  setPreferences(preferences: Preference[]): void {
    localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(preferences));
  }
}

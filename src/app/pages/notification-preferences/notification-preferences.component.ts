// src/app/notification-preferences/notification-preferences.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NotificationPreferencesService, Preference } from '../../core/services/notification-preferences.service';
import { NotificationHttpService, NotificationPreferences } from '../../core/services/notification-http.service';

@Component({
  selector: 'app-notification-preferences',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './notification-preferences.component.html',
  styleUrls: ['./notification-preferences.component.scss']
})
export class NotificationPreferencesComponent implements OnInit {
  desktopNotifications: boolean = false;
  preferences: Preference[] = [];
  userEmail: string = 'usuario@example.com'; // Reemplazar con el email dinámico del usuario

  constructor(
    private notificationPreferencesService: NotificationPreferencesService,
    private notificationHttpService: NotificationHttpService
  ) {}

  ngOnInit() {
    this.loadPreferences();
  }

  loadPreferences() {
    this.desktopNotifications = this.notificationPreferencesService.getDesktopNotifications();
    this.preferences = this.notificationPreferencesService.getPreferences();
  }

  savePreferences() {
    // Guardar en el almacenamiento local
    this.notificationPreferencesService.setDesktopNotifications(this.desktopNotifications);
    this.notificationPreferencesService.setPreferences(this.preferences);

    // Enviar preferencias habilitadas al backend
    this.preferences.forEach(pref => {
      if (pref.enabled) {
        const notificationPreference: NotificationPreferences = {
          email: this.userEmail,
          preference: pref.label
        };

        this.notificationHttpService.setNotificationPreference(notificationPreference).subscribe({
          next: (response) => console.log('Preferencia guardada en el backend:', response),
          error: (error) => console.error('Error al guardar preferencia en el backend:', error)
        });
      }
    });
  }

  toggleDesktopNotifications() {
    if (!this.desktopNotifications) {
      this.preferences.forEach(pref => (pref.enabled = false));
    }
    this.savePreferences();
  }
}

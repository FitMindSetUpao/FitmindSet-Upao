import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NotificationPreferencesService, Preference } from '../../core/services/notification-preferences.component.service';

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
  email: string = '';  // Campo para capturar el email
  frequency: string = '';  // Campo para capturar la frecuencia de notificación
  message: string = '';  // Mensaje para la respuesta del backend

  constructor(private notificationPreferencesService: NotificationPreferencesService) {}

  ngOnInit() {
    this.loadPreferences();
  }

  loadPreferences() {
    this.desktopNotifications = this.notificationPreferencesService.getDesktopNotifications();
    this.preferences = this.notificationPreferencesService.getPreferences();
  }

  savePreferences() {
    this.notificationPreferencesService.setDesktopNotifications(this.desktopNotifications);
    this.notificationPreferencesService.setPreferences(this.preferences);

    // Llamada al backend con el email y la frecuencia seleccionada
    this.notificationPreferencesService.sendPreferencesToBackend(this.email, this.frequency)
      .subscribe({
        next: (response) => this.message = 'Preferencias guardadas y notificación enviada.',
        error: (error) => this.message = 'Hubo un error al guardar las preferencias.'
      });
  }

  toggleDesktopNotifications() {
    if (!this.desktopNotifications) {
      this.preferences.forEach(pref => (pref.enabled = false));
    }
    this.savePreferences();
  }
}

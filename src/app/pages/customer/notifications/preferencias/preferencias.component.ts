import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

interface Preference {
  label: string;
  description: string;
  enabled: boolean;
}

@Component({
  selector: 'app-preferencias',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    FooterComponent,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.scss'],
})
export class PreferenciasComponent implements OnInit {
  desktopNotifications: boolean = false;
  preferences: Preference[] = [
    { label: '¡Toma agua!', description: 'Recibe notificaciones para hidratarte cada dos horas.', enabled: false },
    { label: '¡Ejercítate!', description: 'Recibe notificaciones diarias para realizar ejercicio.', enabled: false },
    { label: '¡Sal a caminar!', description: 'Recibe notificaciones diarias para dar un paseo y despejarte.', enabled: false },
  ];
  usuarioActual: string = '';
  showValidationError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.usuarioActual = this.authService.getUser()?.nombre || 'UsuarioDemo';
    this.loadPreferences();
  }

  loadPreferences() {
    const desktopNotif = localStorage.getItem(`desktopNotifications_${this.usuarioActual}`);
    const savedPreferences = localStorage.getItem(`preferences_${this.usuarioActual}`);

    if (desktopNotif) {
      this.desktopNotifications = JSON.parse(desktopNotif);
    }

    if (savedPreferences) {
      this.preferences = JSON.parse(savedPreferences);
    }
  }

  savePreferences() {
    this.showValidationError = false;

    if (this.desktopNotifications && this.preferences.every((pref) => !pref.enabled)) {
      this.showValidationError = true;
      return;
    }

    // Guardar en localStorage
    localStorage.setItem(`desktopNotifications_${this.usuarioActual}`, JSON.stringify(this.desktopNotifications));
    localStorage.setItem(`preferences_${this.usuarioActual}`, JSON.stringify(this.preferences));

    // Generar notificaciones basadas en las preferencias activadas
    const activatedPreferences = this.preferences.filter((pref) => pref.enabled);
    if (activatedPreferences.length > 0) {
      const notifications = activatedPreferences.map((pref) => ({
        message: this.getCustomMessage(pref.label), // Mensajes personalizados
        time: new Date(),
        interval: this.getNotificationInterval(pref.label), // Intervalo de notificaciones
      }));
      const storedNotifications = JSON.parse(localStorage.getItem(`notifications_${this.usuarioActual}`) || '[]');
      const updatedNotifications = [...storedNotifications, ...notifications];
      localStorage.setItem(`notifications_${this.usuarioActual}`, JSON.stringify(updatedNotifications));
    }

    // Mensaje y redirección
    alert('Preferencias guardadas correctamente.');
    this.router.navigate(['/customer/noti']);
  }

  getCustomMessage(label: string): string {
    switch (label) {
      case '¡Toma agua!':
        return '¡Toma agua!';
      case '¡Ejercítate!':
        return '¡Ejercítate!';
      case '¡Sal a caminar!':
        return '¡Sal a caminar!';
      default:
        return label;
    }
  }

  getNotificationInterval(label: string): number {
    switch (label) {
      case '¡Toma agua!':
        return 2 * 60 * 60 * 1000; // Cada 2 horas
      case '¡Ejercítate!':
      case '¡Sal a caminar!':
        return 24 * 60 * 60 * 1000; // Cada 24 horas
      default:
        return 0;
    }
  }

  toggleDesktopNotifications() {
    if (!this.desktopNotifications) {
      this.preferences.forEach((pref) => (pref.enabled = false));
    }
  }
}

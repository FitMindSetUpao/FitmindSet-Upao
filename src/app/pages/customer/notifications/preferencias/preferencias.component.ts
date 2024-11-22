import { Component, OnInit } from '@angular/core';
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
    { label: 'Recordatorio para tomar agua', description: 'Recibe notificaciones para hidratarte cada hora.', enabled: false },
    { label: 'Recordatorio para ejercitarte', description: 'Recibe notificaciones diarias para realizar ejercicio.', enabled: false },
    { label: 'Recordatorio para caminar', description: 'Recibe notificaciones para dar un paseo y despejarte.', enabled: false },
  ];
  usuarioActual: string = '';
  showValidationError: boolean = false;

  constructor(private authService: AuthService) {}

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

    if (this.desktopNotifications && this.preferences.every(pref => !pref.enabled)) {
      this.showValidationError = true;
      return;
    }

    localStorage.setItem(`desktopNotifications_${this.usuarioActual}`, JSON.stringify(this.desktopNotifications));
    localStorage.setItem(`preferences_${this.usuarioActual}`, JSON.stringify(this.preferences));

    alert('Preferencias guardadas correctamente.');
  }

  toggleDesktopNotifications() {
    if (!this.desktopNotifications) {
      this.preferences.forEach(pref => (pref.enabled = false));
    }
  }
}

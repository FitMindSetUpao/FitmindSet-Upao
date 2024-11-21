import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';


interface Preference {
  label: string;
  description: string;
  enabled: boolean;
}


@Component({
  selector: 'app-notification-preferences',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    FooterComponent,
    NavbarComponent,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {
  desktopNotifications: boolean = false;
  preferences: Preference[] = [
    { label: 'Recordatorio para tomar agua', description: 'Recibe notificaciones para hidratarte cada hora.', enabled: false },
    { label: 'Recordatorio para ejercitarte', description: 'Recibe notificaciones diarias para realizar ejercicio.', enabled: false },
    { label: 'Recordatorio para caminar', description: 'Recibe notificaciones para dar un paseo y despejarte.', enabled: false }
  ];


  ngOnInit() {
    this.loadPreferences();
  }


  savePreferences() {
    localStorage.setItem('desktopNotifications', JSON.stringify(this.desktopNotifications));
    localStorage.setItem('preferences', JSON.stringify(this.preferences));
  }


  loadPreferences() {
    const desktopNotif = localStorage.getItem('desktopNotifications');
    const savedPreferences = localStorage.getItem('preferences');


    if (desktopNotif) {
      this.desktopNotifications = JSON.parse(desktopNotif);
    }


    if (savedPreferences) {
      this.preferences = JSON.parse(savedPreferences);
    }
  }


  toggleDesktopNotifications() {
    if (!this.desktopNotifications) {
      // Si se desactiva `desktopNotifications`, también desactiva todos los toggles de preferencias
      this.preferences.forEach(pref => pref.enabled = false);
    }
    this.savePreferences();  // Guarda el estado actualizado
  }
}

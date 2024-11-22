import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';

interface Notification {
  message: string;
  time: Date;
}

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})

export class NotificacionesComponent implements OnInit {
  notifications: Notification[] = [];
  usuarioActual: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.usuarioActual = this.authService.getUser()?.nombre || 'UsuarioDemo';
    this.loadNotifications();
  }

  loadNotifications() {
    const storedNotifications = localStorage.getItem(`notifications_${this.usuarioActual}`);
    if (storedNotifications) {
      this.notifications = JSON.parse(storedNotifications);
    }
  }

  confirmNotification(index: number) {
    // Eliminar la notificación del arreglo
    this.notifications.splice(index, 1);

    // Actualizar el localStorage
    localStorage.setItem(`notifications_${this.usuarioActual}`, JSON.stringify(this.notifications));
  }

  goToPreferences() {
    this.router.navigate(['/customer/prefe']);
  }
}

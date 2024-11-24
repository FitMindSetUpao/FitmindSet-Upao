import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';

interface Notification {
  message: string;
  time: Date;
  interval?: number; // Intervalo en milisegundos para notificaciones recurrentes
}

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
    RouterLink,
    RouterOutlet,
    MatIconModule,
  ],
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
})
export class NotificacionesComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  usuarioActual: string = '';
  private notificationIntervals: Map<number, any> = new Map(); // Manejador de intervalos

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.usuarioActual = this.authService.getUser()?.nombre || 'UsuarioDemo';
    this.loadNotifications();
    this.initializeNotificationIntervals();
  }

  ngOnDestroy() {
    this.clearAllIntervals(); // Limpiar recursos al destruir el componente
  }

  loadNotifications() {
    const storedNotifications = localStorage.getItem(`notifications_${this.usuarioActual}`);
    if (storedNotifications) {
      this.notifications = JSON.parse(storedNotifications);
    }
  }

  saveNotifications() {
    localStorage.setItem(`notifications_${this.usuarioActual}`, JSON.stringify(this.notifications));
  }

  confirmNotification(index: number) {
    this.notifications.splice(index, 1);
    this.saveNotifications();
    this.clearInterval(index); // Limpiar intervalo relacionado
  }

  initializeNotificationIntervals() {
    this.notifications.forEach((notification, index) => {
      if (notification.interval) {
        this.setNotificationInterval(notification, index);
      }
    });
  }

  setNotificationInterval(notification: Notification, index: number) {
    if (this.notificationIntervals.has(index)) {
      this.clearInterval(index); // Evitar duplicados
    }

    const intervalId = setInterval(() => {
      const newNotification: Notification = {
        message: notification.message,
        time: new Date(),
        interval: notification.interval,
      };
      this.notifications.push(newNotification);
      this.saveNotifications();
    }, notification.interval);

    this.notificationIntervals.set(index, intervalId);
  }

  clearInterval(index: number) {
    if (this.notificationIntervals.has(index)) {
      clearInterval(this.notificationIntervals.get(index));
      this.notificationIntervals.delete(index);
    }
  }

  clearAllIntervals() {
    this.notificationIntervals.forEach((intervalId) => clearInterval(intervalId));
    this.notificationIntervals.clear();
  }

  goToPreferences() {
    this.router.navigate(['/customer/prefe']);
  }
}

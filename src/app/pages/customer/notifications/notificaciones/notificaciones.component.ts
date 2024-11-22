import { Component, OnInit } from '@angular/core';
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
export class NotificacionesComponent implements OnInit {
  notifications: Notification[] = [];
  usuarioActual: string = '';


  constructor(private router: Router, private authService: AuthService) {}


  ngOnInit() {
    this.usuarioActual = this.authService.getUser()?.nombre || 'UsuarioDemo';
    this.loadNotifications();
    this.scheduleNotifications(); // Programar notificaciones recurrentes
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
    // Eliminar la notificación del arreglo y actualizar localStorage
    this.notifications.splice(index, 1);
    this.saveNotifications();
  }


  scheduleNotifications() {
    this.notifications.forEach((notification) => {
      if (notification.interval) {
        setTimeout(() => {
          // Agregar una nueva notificación al final del intervalo
          this.notifications.push({
            message: notification.message,
            time: new Date(),
            interval: notification.interval,
          });
          this.saveNotifications();


          // Reprogramar el mismo recordatorio
          this.scheduleNotifications();
        }, notification.interval);
      }
    });
  }


  goToPreferences() {
    this.router.navigate(['/customer/prefe']);
  }
}

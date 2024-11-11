import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NotificationPreferencesService, Preference } from '../../core/services/notification-preferences.service';

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
  }

  toggleDesktopNotifications() {
    if (!this.desktopNotifications) {
      this.preferences.forEach(pref => (pref.enabled = false));
    }
    this.savePreferences();
  }
}
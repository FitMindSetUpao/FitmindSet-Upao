import { Component, signal } from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    MatIcon
  ],
  standalone: true
})
export class NavbarComponent {
  sidebarCollapsed = signal(false);

  toggleSidebar() {
    this.sidebarCollapsed.update(value => !value);
  }
}

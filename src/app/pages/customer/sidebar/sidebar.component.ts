import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSidebarActive = false;
  isHabitosSubmenuActive = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  toggleHabitosSubmenu() {
    this.isHabitosSubmenuActive = !this.isHabitosSubmenuActive;
  }

  logout() {
    // Implementar lógica de cierre de sesión
  }
}

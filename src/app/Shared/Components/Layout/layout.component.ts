import { Component } from '@angular/core';
import { SidebarComponent } from '../Sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FooterComponent} from '../Footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, FooterComponent],
  template: `
    <div class="layout-container">
      <div class="sidebar">
        <app-sidebar></app-sidebar>
      </div>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {}

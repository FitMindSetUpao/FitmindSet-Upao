import { Component } from '@angular/core';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    FooterComponent,
    RouterLink,
    RouterOutlet,
    CommonModule,
    NavbarComponent
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isSidebarActive = false;

  toggleSidebar(){
    this.isSidebarActive = !this.isSidebarActive;
  }

}

import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { AuthService } from '../../../../core/services/auth.service';



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
  private authService = inject(AuthService);
  constructor(private router: Router) {}

  toggleSidebar(){
    this.isSidebarActive = !this.isSidebarActive;
  }
  
  logout(): void {
    this.authService.logout();
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']); 
  }

}

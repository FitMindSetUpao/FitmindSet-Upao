import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; 
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    RouterLink,
    RouterOutlet,
    MatIconModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isSidebarActive = false;
    private authService = inject(AuthService);

  toggleSidebar(){
    this.isSidebarActive = !this.isSidebarActive;
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']); 
  }

}

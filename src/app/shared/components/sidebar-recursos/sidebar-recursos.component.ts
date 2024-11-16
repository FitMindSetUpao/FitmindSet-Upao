import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon'; 
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-sidebar-recursos',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    RouterOutlet,
    RouterLink,
    MatIconModule,
    MatCardModule,
    MatGridListModule
  ],
  templateUrl: './sidebar-recursos.component.html',
  styleUrl: './sidebar-recursos.component.scss'
})
export class SidebarRecursosComponent {
  private authService = inject(AuthService);
  isAuthenticated: boolean = false;
  isSidebarActive = false;
  constructor(private router:Router){}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive;
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']); 
  }

}

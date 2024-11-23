import {Component, HostListener, inject, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../../../core/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {FooterComponent} from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    MatIcon,
    RouterLinkActive,
    RouterLink,
    NgIf,
    FooterComponent
  ],
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  private authService = inject(AuthService);

  isAuthenticated: boolean = false;
  isSidebarActive = false;
  nombreUsuario: string | null = '';
  recursosSuscritos: any[] = [];
  reportePagos: any[] = [];
  foroComunidad: any[] = [];

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    const user = this.authService.getUser();
    this.nombreUsuario = user ? user.nombre : null;
  }

  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const width = (event.target as Window).innerWidth;
    this.checkSidebarState(width);
  }

  private checkSidebarState(width: number): void {
    this.isSidebarActive = width <= 320;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}

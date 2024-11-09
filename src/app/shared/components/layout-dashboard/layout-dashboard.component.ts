import {Component, inject, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../../Core/Service/auth.service';
import {MatDialog} from '@angular/material/dialog';
import { PhysicalComponent} from '../../../Pages/physical/physical.component';

@Component({
  selector: 'app-layout-dashboard',
  standalone: true,
  imports: [
    MatIcon,
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './layout-dashboard.component.html',
  styleUrl: './layout-dashboard.component.scss'
})
export class LayoutDashboardComponent implements OnInit {
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
    /*const user = this.authService.getUser();
    this.nombreUsuario = user ? user.nombre : null;*/
  }

  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  modalPeso_Altura(): void {
    this.dialog.open(PhysicalComponent, {
      width: '900px',
      height:'600px'
    });
  }
}

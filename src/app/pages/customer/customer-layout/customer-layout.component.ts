import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon'; 
import { AuthService } from '../../../core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { ModalPesoAlturaComponent } from '../modal-peso-altura/modal-peso-altura.component'; 

@Component({
  selector: 'app-customer-layout',
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
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.scss']
})
export class CustomerLayoutComponent implements OnInit {
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']); 
  }

  modalPeso_Altura(): void {
    this.dialog.open(ModalPesoAlturaComponent, {
      width: '900px',
      height:'600px' // Puedes ajustar el tamaño del modal aquí
    });
  }
}

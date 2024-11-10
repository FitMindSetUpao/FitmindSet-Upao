import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Core/Services/dashboard.service';
import { AuthService } from '../../Core/Services/auth.service'; // Importar AuthService
import { DashboardItem } from '../../Shared/Components/Models/dashboard.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ]
})
export class DashboardComponent implements OnInit {
  items: DashboardItem[] = [];
  nombreUsuario: string = '';

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.items = this.dashboardService.getDashboardItems();
    this.nombreUsuario = this.authService.getUsuarioNombre(); // Obtener el nombre del usuario al inicializar el componente
  }
}

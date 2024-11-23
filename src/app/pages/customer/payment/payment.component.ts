import {Component, inject, OnInit} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {PaymentService} from '../../../core/services/payment.service';
import {AuthService} from '../../../core/services/auth.service';
import { SidebarComponent} from '../sidebar/sidebar.component';

interface Purchase {
  fecha: string;
  articulos: string;
  tipo: string;
  total: string;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    MatCard,
    MatTable,
    MatHeaderCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    SidebarComponent
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit{
  private authService = inject(AuthService);

  isAuthenticated: boolean = false;
  nombreUsuario: string | null = '';
  purchaseHistory: Purchase[] = [];
  displayedColumns: string[] = ['fecha', 'articulos', 'tipo', 'total'];

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    const user = this.authService.getUser();
    this.nombreUsuario = user ? user.nombre : null;

    if (this.isAuthenticated) {
      this.fetchPurchaseHistory();
    }
  }

  fetchPurchaseHistory() {
    const authData = this.authService.getUser(); // Obtenemos los datos de autenticación
    const token = authData?.token; // Extraemos el token del usuario autenticado

    if (token) {
      this.paymentService.getPurchaseHistory(token).subscribe({
        next: (response) => {
          this.purchaseHistory = response; // Actualizamos el historial con la respuesta
        },
        error: (error) => {
          console.error('Error al cargar el historial de compras:', error);
        },
      });
    } else {
      console.error('Token no disponible. El usuario podría no estar autenticado.');
    }
  }
}

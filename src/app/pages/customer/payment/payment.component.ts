import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatCard} from '@angular/material/card';

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {PaymentService} from '../../../core/services/payment.service';
import {AuthService} from '../../../core/services/auth.service';
import {MatPaginator} from '@angular/material/paginator';

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
    MatPaginator
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit{
  private authService = inject(AuthService);

  isAuthenticated: boolean = false;
  nombreUsuario: string | null = '';
  //purchaseHistory: Purchase[] = [];
  displayedColumns: string[] = ['fecha', 'articulos', 'tipo', 'total'];

  dataSource = new MatTableDataSource<Purchase>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    const user = this.authService.getUser();
    this.nombreUsuario = user ? user.nombre : null;

    if (this.isAuthenticated) {
      this.fetchPurchaseHistory();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchPurchaseHistory() {
    const authData = this.authService.getUser(); // Obtenemos los datos de autenticación
    const token = authData?.token; // Extraemos el token del usuario autenticado

    if (token) {
      this.paymentService.getPurchaseHistory(token).subscribe({
        next: (response) => {
          this.dataSource.data = response; // Actualizamos el historial con la respuesta
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

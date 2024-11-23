import {Component, inject, OnInit} from '@angular/core';
import {PaymentStatus, PurchaseResponse} from '../../../../shared/models/purchase-response.model';
import { PurchaseService} from '../../../../core/services/purchase.service';
import {CurrencyPipe, DatePipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    CurrencyPipe
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  purchases: PurchaseResponse[] = [];
  private purchaseService = inject(PurchaseService);

  ngOnInit(): void {
    this.loadPurchaseHistory();
  }

  loadPurchaseHistory(): void {
    this.purchaseService.getPurchaseHistory().subscribe({
      next: (data) => (this.purchases = data),
      error: () => console.error('Error al cargar historial de compras'),
    });
  }

  getPaymentStatusClass(status: PaymentStatus): string {
    switch (status) {
      case PaymentStatus.PAID:
        return 'status-paid';
      case PaymentStatus.PENDING:
        return 'status-pending';
      case PaymentStatus.FAILED:
        return 'status-failed';
      default:
        return '';
    }
  }
}

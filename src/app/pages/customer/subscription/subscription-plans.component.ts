import { Component } from '@angular/core';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss']
})
export class SubscriptionPlansComponent {
  plans = [
    { name: 'Mensual', price: 10, description: 'Acceso por 1 mes', id: 'monthly' },
    { name: 'Anual', price: 100, description: 'Acceso por 1 año', id: 'annual' }
  ];

  isLoading = false; // Estado de carga
  errorMessage: string | null = null;

  constructor(private subscriptionService: SubscriptionService) {}

  subscribe(planId: string) {
    this.isLoading = true;
    this.errorMessage = null;
    this.subscriptionService.subscribe(planId).subscribe(
      response => {
        this.isLoading = false;
        if (response && response.paymentUrl) {
          window.location.href = response.paymentUrl;
        } else {
          this.errorMessage = 'No se pudo procesar la suscripción. Intenta nuevamente.';
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    );
  }
}

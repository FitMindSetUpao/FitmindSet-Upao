import { Component } from '@angular/core';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  standalone: true,
  styleUrls: ['./subscription-plans.component.scss']
})
export class SubscriptionPlansComponent {
  // Lista de planes de suscripción
  plans = [
    { name: 'Mensual', price: 10, description: 'Acceso por 1 mes', id: 'monthly' },
    { name: 'Anual', price: 100, description: 'Acceso por 1 año', id: 'annual' }
  ];

  constructor(private subscriptionService: SubscriptionService) {}

  // Método para suscribirse a un plan
  subscribe(planId: string) {
    this.subscriptionService.subscribe(planId).subscribe(response => {
      if (response && response.paymentUrl) {
        // Redirige al usuario a la URL de pago
        window.location.href = response.paymentUrl;
      } else {
        alert('Error al procesar la suscripción. Por favor, inténtalo de nuevo.');
      }
    });
  }
}

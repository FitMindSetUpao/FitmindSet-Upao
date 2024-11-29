import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FooterComponent} from '../../../shared/components/footer/footer.component';
import {NgClass} from '@angular/common';
import { PaymentNavbarComponent} from '../../../shared/components/payment-navbar/payment-navbar.component';

@Component({
  selector: 'app-payment-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    RouterLink,
    RouterLinkActive,
    NgClass,
    PaymentNavbarComponent,
  ],
  templateUrl: './payment-layout.component.html',
  styleUrl: './payment-layout.component.scss'
})
export class PaymentLayoutComponent {
  isSidebarActive = false;

  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive;
  }
}

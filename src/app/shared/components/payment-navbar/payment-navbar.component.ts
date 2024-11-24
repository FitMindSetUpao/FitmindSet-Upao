import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-payment-navbar',
  standalone: true,
  imports: [
    RouterLink,
    MatIcon
  ],
  templateUrl: './payment-navbar.component.html',
  styleUrl: './payment-navbar.component.scss'
})
export class PaymentNavbarComponent {
  isAuthenticated: boolean = false;
  isCustomer: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isCustomer = this.authService.getUserRole() === 'CUSTOMER';
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.isCustomer = false;
    this.router.navigate(['/home']);
  }

  goToCart(): void {
    if (this.isCustomer) {
      this.router.navigate(['/customer/cart']);
    }
  }
}

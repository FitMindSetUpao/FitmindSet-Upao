import {Component, inject, OnInit} from '@angular/core';
import {
  PurchaseCreateUpdateRequest,
  PurchaseItemCreateUpdateRequest
} from '../../../../shared/models/purchase-create-update-request.model';
import {PurchaseService} from '../../../../core/services/purchase.service';
import {CartService} from '../../../../core/services/cart.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../core/services/auth.service';
import { CheckoutService} from '../../../../core/services/checkout.service';
import {Purchase} from '../../../../shared/models/purchase.model';
import {CommonModule, CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CurrencyPipe,
    CommonModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: PurchaseItemCreateUpdateRequest[] = [];
  total: number = 0;
  loading = false;
  customerId!: number;

  private purchaseService = inject(PurchaseService);
  private checkoutService = inject(CheckoutService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loadCart();

    this.customerId = this.authService.getUser()?.customerId || 0;

    const token = this.route.snapshot.queryParamMap.get('token');
    const payerId = this.route.snapshot.queryParamMap.get('PayerId');

    if (token && payerId) {
      this.loading = true;

      this.checkoutService.capturePaypalOrder(token)
        .subscribe(response => {
          if (response.completed) {
            this.clearCart();
            this.router.navigate(['/customer/cart', response.purchaseId]);
          }
        })
    }
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getCartTotal();
    
  }

  removeItem(recursoId: number): void {
    this.cartService.removeFromCart(recursoId);
    this.loadCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }

  proceedToCheckout(): void {
    const cartItems = this.cartService.getCartItems();

    const purchaseRequest: PurchaseCreateUpdateRequest = {
      total: this.total,
      customerId: this.customerId,
      items: cartItems.map((item) => ({
        recursoId: item.recursoId,
        nombreRecurso: item.nombreRecurso,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    this.loading = true;

    this.purchaseService.createPurchase(purchaseRequest)
      .subscribe(purchase => {
        this.checkoutService.createPaypalOrder(purchase.id)
          .subscribe(response => {
            window.location.href = response.paypalUrl;
          })
      })
  }
}

import {Component, inject, Input, OnInit} from '@angular/core';
import {RecursoResponse} from '../../models/recurso-response.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RecursoService} from '../../../core/services/recurso.service';
import {AuthService} from '../../../core/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CartService} from '../../../core/services/cart.service';
import {HomeService} from '../../../core/services/home.service';
import {PurchaseItemCreateUpdateRequest} from '../../models/purchase-create-update-request.model';
import {MatCard, MatCardContent, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {CurrencyPipe, DatePipe} from '@angular/common';
import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';


@Component({
  selector: 'app-recurso-details',
  standalone: true,
  imports: [
    MatCard,
    MatCardImage,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle,
    CurrencyPipe,
    DatePipe,
    ApiImgPipe,
  ],
  templateUrl: './recurso-details.component.html',
  styleUrl: './recurso-details.component.scss'
})
export class RecursoDetailsComponent implements OnInit{
  recurso!: RecursoResponse;
  @Input() recursoid!: number;

  private route = inject(ActivatedRoute);
  private recursoService = inject(RecursoService);
  private homeService = inject (HomeService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  private cartService = inject(CartService);

  isAuthenticated = false;
  isCustomer: boolean = false;

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isCustomer = this.authService.getUserRole() === 'CUSTOMER';

    if (this.recursoid){
      this.loadRecursoDetails(this.recursoid);
    }
  }

  loadRecursoDetails(recursoid: number): void {
    this.homeService.getRecursoDetailsById(recursoid).subscribe({
      next: (data) => (this.recurso = data),
      error: () => this.showSnackBar('Error al cargar detalles del recurso'),
    });
  }

  goBackToHome(): void {
    const routePath = this.isCustomer ? '/customer/pagos/catalog' : '/home';
    this.router.navigate([routePath]);
  }

  addToCart(): void {
    if (!this.isCustomer) {
      this.showSnackBar(
        'Inicia sesión como customer para agregar al carrito'
      );
      return;
    }

    const cartItem : PurchaseItemCreateUpdateRequest = {
      recursoId: this.recursoid,
      nombreRecurso: this.recurso.nombreRecurso,
      quantity : 1,
      price: this.recurso.precioRecurso,
    };

    this.cartService.addToCart(cartItem);
    console.log('Recurso agregado al carrito:', cartItem);
    this.showSnackBar('Recurso agregado al carrito de manera correcta');
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}

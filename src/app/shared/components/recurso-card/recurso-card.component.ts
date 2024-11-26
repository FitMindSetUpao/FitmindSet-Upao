import {Component, inject, Input} from '@angular/core';
import {Recurso} from '../../models/recurso.model';
import {RecursoResponse} from '../../models/recurso-response.model';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle, MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-recurso-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardImage,
    MatCardActions,
    MatButton,
    MatCardSubtitle,
    MatCardTitle
  ],
  templateUrl: './recurso-card.component.html',
  styleUrl: './recurso-card.component.scss'
})
export class RecursoCardComponent {
  @Input() recurso!: RecursoResponse;
  isCustomer: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.isCustomer = this.authService.getUserRole() === 'CUSTOMER';
  }

  viewDetails() {
    const routePath = this.isCustomer
      ? '/customer/catalog/details'
      : '/home/book-details';
    this.router.navigate([routePath, this.recurso.recursoid]);
  }
}

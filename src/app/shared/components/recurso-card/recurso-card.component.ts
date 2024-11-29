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
import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';

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
    MatCardTitle,
    ApiImgPipe,
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



  viewDetails(recursoId: number) {  // Usa 'recursoId' en lugar de 'id'
    console.log('ID del recurso:', recursoId); // Para depurar
    if (recursoId) {
      this.router.navigate(['customer/pagos/catalog/details', recursoId]);
    } else {
      console.error('El ID del recurso no está definido');
    }
  }
  
  
  
  
}

import {Component, inject, OnInit} from '@angular/core';
import { RecursoCardComponent} from '../../../shared/components/recurso-card/recurso-card.component';
import { HomeService} from '../../../core/services/home.service';
import { Router } from '@angular/router';
import { RecursoResponse } from '../../../shared/models/recurso-response.model';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatCardSubtitle} from '@angular/material/card';
import { PaymentLayoutComponent } from '../payment-layout/payment-layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RecursoCardComponent, MatFormField, MatInput, FormsModule, MatIconButton, MatIcon, MatCardSubtitle, MatLabel, PaymentLayoutComponent,CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  recentRecursos: RecursoResponse[] = [];
  filteredRecursos: RecursoResponse[] = [];
  searchQuery: string = '';

  private recursoService = inject(HomeService);

  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.recursoService.getRecentRecursos().subscribe({
      next: (recurso) => {
        console.log('Recursos cargados:', recurso); // Verifica si 'recursoid' está presente
        this.recentRecursos = recurso;
        this.filteredRecursos = recurso;
      },
      error: (error) => console.error('Error al cargar recursos recientes', error),
    });
  }
  

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredRecursos = this.recentRecursos.filter(
      (recurso) =>
        recurso.nombreRecurso.toLowerCase().includes(query) ||
        recurso.autorNombre.toLowerCase().includes(query)
    );
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}

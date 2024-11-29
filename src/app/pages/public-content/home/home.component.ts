import {Component, inject, OnInit} from '@angular/core';
import {RecursoResponse} from '../../../shared/models/recurso-response.model';
import {HomeService} from '../../../core/services/home.service';
import {Router} from '@angular/router';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {RecursoCardComponent} from '../../../shared/components/recurso-card/recurso-card.component';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    MatIcon,
    RecursoCardComponent,
    MatIconButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  recentRecursos: RecursoResponse[] = [];
  filteredRecursos: RecursoResponse[] = [];
  searchQuery: string = '';

  private recursoService = inject(HomeService);

  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.recursoService.getRecentRecursos().subscribe({
      next: (recurso) => {
        this.recentRecursos = recurso;
        this.filteredRecursos = recurso;
      },
      error: (error) =>
        console.error('Error al cargar recursos recientes', error),
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

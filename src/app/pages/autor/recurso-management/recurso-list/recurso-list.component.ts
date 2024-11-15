import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Recurso } from '../../../../shared/models/recurso.model';
import { PageableResponse } from '../../../../shared/models/pageable.response.model';
import { ApiImgPipe } from '../../../../core/pipes/api-img.pipe';
import { RecursoService } from '../../../../core/services/recurso.service';
import { RecursoResponse } from '../../../../shared/models/recurso-response.model';

@Component({
  selector: 'app-recurso-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ApiImgPipe,
  ],
  templateUrl: './recurso-list.component.html',
  styleUrls: ['./recurso-list.component.scss'],
})
export class RecursoListComponent implements OnInit {
  recursos: RecursoResponse[] = [];
  filteredRecursos: RecursoResponse[] = [];
  filterText = '';

  displayedColumns: string[] = [
    'cover',
    'nombreRecurso',
    'nombreAutor',
    'tipoDeHabito',
    'tipoDeRecurso',
    'precio',
    'actions',
  ];
  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;

  private recursoService = inject(RecursoService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadRecursos();
  }

  loadRecursos(pageIndex: number = 0, pageSize: number = 5): void {
    this.recursoService.paginateRecursos(pageIndex, pageSize).subscribe({
      next: (response: PageableResponse<RecursoResponse>) => {
        this.recursos = response.content;
        this.filteredRecursos = response.content;
        this.totalElements = response.totalElements;
        this.pageSize = response.size;
        this.pageIndex = response.number;
      },
      error: () => this.showSnackBar('Error al cargar la lista de recursos'),
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.filteredRecursos = this.recursos.filter((recurso) =>
      recurso.nombreRecurso.toLowerCase().includes(filterValue)
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadRecursos(this.pageIndex, this.pageSize);
  }

  createNewRecurso(): void {
    this.router.navigate(['/autor/recursos/crear']);
  }

  actualizarRecurso(recursoid: number): void {
    this.router.navigate(['/autor/recursos/edit', recursoid]);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}

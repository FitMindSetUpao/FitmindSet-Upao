import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HabitoResponse } from '../../../../../shared/models/habito-response.model';
import { HabitoService } from '../../../../../core/services/habito.services';
import { PageableResponse } from '../../../../../shared/models/pageable.response.model';


@Component({
  selector: 'app-meta-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './meta-list.component.html',
  styleUrls: ['./meta-list.component.scss']
})
export class MetaListComponent implements OnInit {
  habitos: HabitoResponse[] = [];
  filteredHabitos: HabitoResponse[] = [];
  filterText = '';
  
  displayedColumns: String[] = [
    'nombre',
    'descripcion',
    'actions',
  ];
  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;
  
  private habitoService = inject(HabitoService);
  private snackbar = inject(MatSnackBar);
  private router = inject(Router);
  
  ngOnInit(): void {
    this.loadHabitos();
  }

  loadHabitos(pageIndex: number = 0, pageSize: number = 5): void {
    this.habitoService.paginateHabitos(pageIndex, pageSize).subscribe({
      next: (response: PageableResponse<HabitoResponse>) => {
        this.habitos = response.content;
        this.filteredHabitos = response.content;
        this.totalElements = response.totalElements;
        this.pageSize = response.size;
        this.pageIndex = response.number;
      },
      error: () => this.showSnackBar('Error al cargar la lista de Hábitos'),
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredHabitos = this.habitos.filter(habito =>
      habito.nombreHabito.toLowerCase().includes(filterValue)
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadHabitos(this.pageIndex, this.pageSize);
  }

  createNewMeta(habitoId: number): void {
    this.router.navigate(['/customer/habitos/metas/crear', habitoId]);
  }

  viewDetails(habitoId: number): void {
    // Navigating to the habit's metas details page
    this.router.navigate(['/customer/habitos/metas/detalles', habitoId]);
  }

  private showSnackBar(message: string): void {
    this.snackbar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}

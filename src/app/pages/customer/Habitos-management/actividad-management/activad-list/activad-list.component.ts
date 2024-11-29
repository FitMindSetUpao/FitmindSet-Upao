import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeguimientoService } from '../../../../../core/services/seguimiento.service';
import { HabitoService } from '../../../../../core/services/habito.services';
import { SeguimientoDTO } from '../../../../../shared/models/seguimiento.model';
import { HabitoResponse } from '../../../../../shared/models/habito-response.model';
import { MetaResponseDTO } from '../../../../../shared/models/meta-response.model';
import { MetaService } from '../../../../../core/services/meta.services';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-activad-list',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './activad-list.component.html',
  styleUrls: ['./activad-list.component.scss'],
})
export class ActivadListComponent implements OnInit {
  // Variables for habit and goal management
  habitos: HabitoResponse[] = [];
  filteredHabitos: HabitoResponse[] = [];
  metas: MetaResponseDTO[] = [];
  seguimientos: SeguimientoDTO[] = [];
  filterText: string = ''; // Filter text for habit search

  // Paginator configuration
  totalElements: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  // Display columns for the table
  displayedColumns: string[] = ['nombre', 'metas', 'actions'];
  selectedHabitoId: number = 0;

  constructor(
    private habitoService: HabitoService,
    private seguimientoService: SeguimientoService,
    private snackBar: MatSnackBar,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.loadHabitos(); // Load habits on initialization
  }

  // Load habits and their details
  loadHabitos(): void {
    this.habitoService.paginateHabitos(0, 5).subscribe({
      next: (response) => {
        this.habitos = response.content;
        this.applyFilter(); // Apply filter to initial load
        this.totalElements = this.habitos.length;
      },
      error: () => {
        this.snackBar.open('Error al cargar la lista de hábitos.', 'Cerrar', { duration: 3000 });
      },
    });
  }

  // Apply the filter to search habits by name
  applyFilter(): void {
    if (this.filterText) {
      this.filteredHabitos = this.habitos.filter(habito =>
        habito.nombreHabito.toLowerCase().includes(this.filterText.toLowerCase())
      );
    } else {
      this.filteredHabitos = [...this.habitos];
    }
    this.updatePaginator();
  }

  // Update the paginator when the habits are filtered
  updatePaginator(): void {
    this.totalElements = this.filteredHabitos.length;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredHabitos = this.filteredHabitos.slice(startIndex, endIndex);
  }

  // Handle page change in paginator
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginator();
  }

  // Handle habit selection
  onHabitoSelected(): void {
    if (this.selectedHabitoId) {
      this.metaService.obtenerMetasPorHabito(this.selectedHabitoId).subscribe(
        (data) => {
          this.metas = data;
        },
        (error) => {
          console.error('Error al cargar las metas', error);
        }
      );

      this.seguimientoService.generarReporte(this.selectedHabitoId).subscribe(
        (data) => {
          this.seguimientos = data;
        },
        (error) => {
          console.error('Error al cargar los seguimientos', error);
        }
      );
    }
  }

  // Register activity for a habit
  registerActivity(habitoId: number): void {
    console.log('Registrar actividad para el hábito:', habitoId);
    // Open a modal or redirect to the activity registration form
  }

  // View details for a meta
  viewMetaDetails(habitoId: number): void {
    console.log('Ver detalles de las metas para el hábito:', habitoId);
    // Open a modal or navigate to view details for this habit's goals
  }

  // Edit an activity record
  editarSeguimiento(seguimiento: SeguimientoDTO): void {
    console.log('Actualizar seguimiento:', seguimiento);
    // Open edit form or modal to update the activity record
  }

  // Delete an activity record
  eliminarSeguimiento(id: number): void {
    this.seguimientoService.eliminarSeguimiento(id).subscribe(
      () => {
        this.snackBar.open('Seguimiento eliminado con éxito.', 'Cerrar', { duration: 3000 });
        this.seguimientos = this.seguimientos.filter((s) => s.id !== id);
      },
      (error) => {
        console.error('Error al eliminar seguimiento:', error);
        this.snackBar.open('No se pudo eliminar el seguimiento.', 'Cerrar', { duration: 3000 });
      }
    );
  }
}

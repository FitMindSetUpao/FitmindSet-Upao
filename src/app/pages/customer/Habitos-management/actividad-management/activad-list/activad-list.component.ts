import { Component, OnInit } from '@angular/core';
import { SeguimientoService } from '../../../../../core/services/seguimiento.service';
import { SeguimientoDTO } from '../../../../../shared/models/reporte.model';  // Asegúrate de que SeguimientoDTO sea la clase correcta
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ac-list',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './activad-list.component.html',
  styleUrls: ['./activad-list.component.scss'],
})
export class ActivadListComponent implements OnInit {
  seguimientos: SeguimientoDTO[] = [];  // Lista de seguimientos
  filteredSeguimientos: SeguimientoDTO[] = [];  // Seguimientos filtrados
  filterText: string = '';  // Filtro por observaciones
  totalElements: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  customerId!: number; // Asegúrate de que este ID sea proporcionado correctamente

  constructor(
    private seguimientoService: SeguimientoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Recuperar el customerId de algún lugar (localStorage, sesión, etc.)
    this.customerId = parseInt(localStorage.getItem('customerId') || '0', 10);

    if (this.customerId) {
      this.loadSeguimientos();
    } else {
      this.snackBar.open('Customer ID no encontrado', 'Cerrar', { duration: 3000 });
    }
  }

  loadSeguimientos(): void {
    // Cargar los seguimientos con el customerId
    this.seguimientoService.obtenerSeguimientosPorCustomer(this.customerId).subscribe(
      (data) => {
        this.seguimientos = data;
        this.filteredSeguimientos = [...this.seguimientos];  // Inicializa la lista filtrada
        this.totalElements = this.seguimientos.length;
        this.applyFilter();  // Aplicar el filtro si es necesario
      },
      (error) => {
        console.error('Error al cargar los seguimientos:', error);
        this.snackBar.open('Hubo un error al cargar los seguimientos', 'Cerrar', { duration: 3000 });
      }
    );
  }

  applyFilter(): void {
    if (this.filterText) {
      // Filtrar por observaciones
      this.filteredSeguimientos = this.seguimientos.filter(seguimiento =>
        seguimiento.fecha.toLowerCase().includes(this.filterText.toLowerCase())
      );
    } else {
      // Si no hay filtro, mostrar todos los seguimientos
      this.filteredSeguimientos = [...this.seguimientos];
    }
    this.updatePaginator();  // Actualizar la paginación después de aplicar el filtro
  }

  updatePaginator(): void {
    this.totalElements = this.filteredSeguimientos.length;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredSeguimientos = this.filteredSeguimientos.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginator();  // Actualiza los elementos de la página
  }
}

import { Component, OnInit } from '@angular/core';
import { HabitoService } from '../../../../../core/services/habito.services';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-activad-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    CommonModule ,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
 templateUrl: './activad-list.component.html',
  styleUrls: ['./activad-list.component.scss'],
})
export class ActivadListComponent implements OnInit {
  habitos: any[] = []; // Array de hábitos con metas asociadas
  filteredHabitos: any[] = []; // Array de hábitos filtrados
  filterText: string = ''; // Texto de filtro para la búsqueda

  // Configuración de paginación
  totalElements: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  // Columnas a mostrar en la tabla
  displayedColumns: string[] = ['nombre', 'metas', 'actions'];

  constructor(private habitoService: HabitoService) {}

  ngOnInit(): void {
    this.loadHabitos();
  }

  // Cargar los hábitos y sus metas desde el servicio
  loadHabitos(): void {
    this.habitoService.getHabitosDetails().subscribe(
      (data: any) => {
        this.habitos = data;
        this.applyFilter(); // Aplicar filtro inicial
        this.totalElements = this.habitos.length;
      },
      (error) => {
        console.error('Error al cargar hábitos:', error);
      }
    );
  }

  // Filtrar los hábitos por el texto de búsqueda
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

  // Actualizar la paginación al filtrar
  updatePaginator(): void {
    this.totalElements = this.filteredHabitos.length;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredHabitos = this.filteredHabitos.slice(startIndex, endIndex);
  }

  // Cambiar de página en la paginación
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginator();
  }

  // Método para el botón de registrar actividad
  registerActivity(habitoId: number): void {
    console.log('Registrar actividad para el hábito:', habitoId);
    // Aquí puedes abrir un modal o redirigir al formulario para registrar actividad física
  }

  // Método para el botón de ver detalles de las metas
  viewMetaDetails(habitoId: number): void {
    console.log('Ver detalles de las metas para el hábito:', habitoId);
    // Aquí puedes abrir un modal o cargar detalles en una nueva vista
  }
}

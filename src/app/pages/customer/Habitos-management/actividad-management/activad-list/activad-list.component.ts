import { Component, OnInit } from '@angular/core';
import { MetaResponseDTO } from '../../../../../shared/models/meta-response.model';
import { HabitoService } from '../../../../../core/services/habito.services';
import { MetaService } from '../../../../../core/services/meta.services';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

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
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
  ],
  templateUrl: './activad-list.component.html',
  styleUrls: ['./activad-list.component.scss'],
})
export class ActivadListComponent implements OnInit {
  habitos: any[] = [];  // Asegúrate de que este tipo sea adecuado para tus hábitos
  filteredHabitos: any[] = [];
  filterText: string = ''; // Filtro por nombre de hábito

  totalElements: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  displayedColumns: string[] = ['nombre', 'metas', 'actions'];

  constructor(private habitoService: HabitoService, private metaService: MetaService) {}

  ngOnInit(): void {
    this.loadHabitos();
  }

  loadHabitos(): void {
    this.habitoService.getHabitosDetails().subscribe(
      (data: any) => {
        this.habitos = data;
        this.applyFilter();  // Aplica el filtro después de cargar los datos
        this.totalElements = this.habitos.length;
      },
      (error) => {
        console.error('Error al cargar hábitos:', error);
      }
    );
  }

  applyFilter(): void {
    if (this.filterText) {
      this.filteredHabitos = this.habitos.filter((habito) =>
        habito.nombreHabito.toLowerCase().includes(this.filterText.toLowerCase())
      );
    } else {
      this.filteredHabitos = [...this.habitos];
    }
    this.updatePaginator();
  }

  updatePaginator(): void {
    this.totalElements = this.filteredHabitos.length;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredHabitos = this.filteredHabitos.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginator();
  }

  registerActivity(habitoId: number): void {
    console.log('Registrar actividad para el hábito:', habitoId);
  }

  viewMetaDetails(habitoId: number): void {
    this.metaService.obtenerMetasPorHabito(habitoId).subscribe(
      (metas: MetaResponseDTO[]) => {
        const habito = this.habitos.find(h => h.id === habitoId);
        if (habito) {
          habito.metas = metas;
        }
        console.log('Detalles de metas:', metas);
      },
      (error) => {
        console.error('Error al cargar detalles de metas:', error);
      }
    );
  }

  // Método para ver el registro de actividad de una meta
  viewActivityRecord(metaId: number): void {
    console.log('Ver registro de actividad para la meta:', metaId);
  
  }
}

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
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-activad-list',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './activad-list.component.html',
  styleUrls: ['./activad-list.component.scss'],
})
export class ActivadListComponent implements OnInit {
  selectedHabitoId: number = 0;
  habitos: HabitoResponse[] = [];
  metas: MetaResponseDTO[] = [];
  seguimientos: SeguimientoDTO[] = [];

  constructor(
    private habitoService: HabitoService,
    private seguimientoService: SeguimientoService,
    private snackBar: MatSnackBar,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.loadHabitos(); // Cargar hábitos al inicio
  }

  loadHabitos(): void {
    this.habitoService.paginateHabitos(0, 5).subscribe({
      next: (response) => {
        this.habitos = response.content;
      },
      error: () => {
        this.snackBar.open('Error al cargar la lista de hábitos.', 'Cerrar', { duration: 3000 });
      },
    });
  }

  onHabitoSelected(): void {
    if (this.selectedHabitoId) {
      // Cargar las metas asociadas al hábito seleccionado
      this.metaService.obtenerMetasPorHabito(this.selectedHabitoId).subscribe(
        (data) => {
          this.metas = data;  // Asignar las metas asociadas al hábito
        },
        (error) => {
          console.error('Error al cargar las metas', error);
        }
      );

      this.seguimientoService.generarReporte(this.selectedHabitoId).subscribe(
        (data) => {
          this.seguimientos = data;  // Asignar los seguimientos
        },
        (error) => {
          console.error('Error al cargar los seguimientos', error);
        }
      );
    }
  }
  obtenerMetas(): void {
    this.metaService.obtenerMetasPorHabito(this.selectedHabitoId).subscribe({
      next: (metas) => {
        this.metas = metas;
      },
      error: () => {
        this.snackBar.open('Error al cargar las metas.', 'Cerrar', { duration: 3000 });
      },
    });
  }

  verDetalles(metaId: number): void {
    this.seguimientoService.generarReporte(metaId).subscribe({
      next: (seguimientos) => {
        this.seguimientos = seguimientos;
      },
      error: () => {
        this.snackBar.open('Error al cargar los registros de actividad.', 'Cerrar', { duration: 3000 });
      },
    });
  }

  editarSeguimiento(seguimiento: SeguimientoDTO): void {
    console.log('Actualizar seguimiento:', seguimiento);
    // Redirigir a la interfaz de edición o abrir un modal
  }

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

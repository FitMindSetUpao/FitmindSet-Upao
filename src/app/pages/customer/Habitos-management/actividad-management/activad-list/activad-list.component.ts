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
import { Router, ActivatedRoute } from '@angular/router';
import { SeguimientoResponse } from '../../../../../shared/models/seguimiento-response.model';

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
  selectedMetaId: number=0;

  metaId: number;



  constructor(
    private habitoService: HabitoService,
    private seguimientoService: SeguimientoService,
    private snackBar: MatSnackBar,
    private metaService: MetaService,
    private router: Router,
    private route:ActivatedRoute
  ) {
    this.metaId = +this.route.snapshot.paramMap.get('metaId')!;
  }

  ngOnInit(): void {

    this.loadHabitos();
    this.obtenerSeguimientos();
  }

  obtenerSeguimientos(): void {
    this.seguimientoService.obtenerSeguimientosPorCustomer(this.metaId).subscribe(
      (data) => {
        console.log('Seguimientos obtenidos:', data);
        this.seguimientos = data;
      },
      (error) => {
        console.error('Error al obtener los seguimientos', error);
      }
    );
  }
  
  loadHabitos(): void {
    this.habitoService.getHabitos().subscribe({
      next: (response) => {
        this.habitos = response;  // Asignar la lista de hábitos al componente
      },
      error: () => {
        this.snackBar.open('Error al cargar los hábitos.', 'Cerrar', { duration: 3000 });
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
  editarSeguimiento(seguimientoid:number):void{
    this.router.navigate(['/customer/habitos/actividad/edit', seguimientoid]);
  }

  loadSeguimientosByMetaId(metaId: number): void {
    this.seguimientoService.getSeguimientosByMetaId(metaId).subscribe(
      (seguimientos) => {
        console.log('Datos recibidos de la API:', seguimientos);
        this.seguimientos = seguimientos || [];
      },
      (error) => {
        console.error('Error al cargar seguimientos:', error);
        this.seguimientos = [];
      }
    );
  }
  
  
  
  eliminarSeguimiento(id: number, metaId: number): void {
    // Verificar si el ID es válido
    if (!id || id <= 0) {
      console.error('El ID del seguimiento no es válido:', id);
      alert('Error: El ID del seguimiento no es válido.');
      return;
    }
  
    // Llamar al servicio para eliminar el seguimiento
    this.seguimientoService.eliminarSeguimiento(id).subscribe(
      () => {
        alert('Seguimiento eliminado con éxito');
        this.loadSeguimientosByMetaId(metaId); // Recargar los seguimientos con el metaId correspondiente
      },
      (error) => {
        console.error('Error al eliminar seguimiento:', error);
        alert('Error al eliminar seguimiento. Intenta nuevamente.');
      }
    );
  }
  
  
  
  
  
  }
  
  

  

  
  
  
  
  

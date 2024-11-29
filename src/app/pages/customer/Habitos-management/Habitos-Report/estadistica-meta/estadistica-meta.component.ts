import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MetaService } from '../../../../../core/services/meta.services';
import { SeguimientoService } from '../../../../../core/services/seguimiento.service';
import { MetaResponseDTO } from '../../../../../shared/models/meta-response.model';
import { SeguimientoDTO } from '../../../../../shared/models/seguimiento.model';
import { Chart } from 'chart.js/auto';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HabitoService } from '../../../../../core/services/habito.services';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-estadistica-meta',
  standalone: true,
  imports: [MatListModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatProgressBarModule, MatIconModule, CommonModule,MatProgressSpinnerModule],
  templateUrl: './estadistica-meta.component.html',
  styleUrl: './estadistica-meta.component.scss'
})
export class EstadisticaMetaComponent implements OnInit {

  selectedHabitoId: number = 0;
  selectedMetaId: number = 0;
  habitos: any[] = [];  // Aquí debes tener la lista de hábitos
  metas: MetaResponseDTO[] = [];
  seguimientos: SeguimientoDTO[] = [];
  progressChart: any;

  constructor(
    private metaService: MetaService,
    private seguimientoService: SeguimientoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private habitoService: HabitoService  // Servicio para cargar hábitos
  ) {}

  ngOnInit(): void {
    this.loadHabitos();
  }

  loadHabitos(): void {
    // Cargar los hábitos del cliente
    this.habitoService.getHabitos().subscribe({
      next: (response) => {
        this.habitos = response;
      },
      error: () => {
        this.snackBar.open('Error al cargar los hábitos.', 'Cerrar', { duration: 3000 });
      },
    });
  }

  onHabitoSelected(habitoId: number): void {
    this.selectedHabitoId = habitoId;
    this.loadMetas();
  }

  loadMetas(): void {
    this.metaService.obtenerMetasPorHabito(this.selectedHabitoId).subscribe({
      next: (response) => {
        this.metas = response;
      },
      error: () => {
        this.snackBar.open('Error al cargar las metas.', 'Cerrar', { duration: 3000 });
      },
    });
  }

  onMetaSelected(): void {
    if (this.selectedMetaId) {
      this.loadSeguimientos();
    }
  }

  loadSeguimientos(): void {
    this.seguimientoService.generarReporte(this.selectedMetaId).subscribe({
      next: (seguimientos) => {
        this.seguimientos = seguimientos;
        this.updateProgressChart(); // Actualiza el gráfico con los nuevos datos
      },
      error: () => {
        this.snackBar.open('Error al cargar los seguimientos.', 'Cerrar', { duration: 3000 });
      },
    });
  }

  getProgressPercentage(): number {
    if (this.seguimientos.length === 0) return 0;

    const completedCount = this.seguimientos.filter((seguimiento) => seguimiento.estado === 'FINALIZADO').length;
    const total = this.seguimientos.length;
    return (completedCount / total) * 100;
  }
  updateProgressChart(): void {
    const progress = this.getProgressPercentage();
  
    if (this.progressChart) {
      // Solo actualizar el progreso, sin volver a renderizar el gráfico entero.
      this.progressChart.data.datasets[0].data = [progress, 100 - progress];
      this.progressChart.update();
    } else {
      this.createProgressChart(progress);
    }
  }
  
  createProgressChart(progress: number): void {
    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;
    this.progressChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Progreso'],
        datasets: [{
          label: 'Progreso de la Meta',
          data: [progress, 100 - progress], // Aquí actualizamos los valores dinámicamente
          backgroundColor: ['#4caf50', '#e0e0e0'],
          borderWidth: 0,
        }],
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => `Progreso: ${Math.round(progress)}%`, // Muestra el porcentaje exacto
            },
          },
          legend: {
            display: false, // Opcional: desactivar la leyenda si no se necesita
          },
        },
      },
    });
  }
  
  verDetalles(seguimientoId: number): void {
    this.router.navigate([`/seguimiento/detalles/`, seguimientoId]);
  }
}

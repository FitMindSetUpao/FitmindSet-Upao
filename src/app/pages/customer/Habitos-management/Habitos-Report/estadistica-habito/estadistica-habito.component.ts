import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HabitoService } from '../../../../../core/services/habito.services';
import { SeguimientoService } from '../../../../../core/services/seguimiento.service';
import { SeguimientoDTO } from '../../../../../shared/models/seguimiento.model';
import { Chart } from 'chart.js/auto';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReporteDTO } from '../../../../../shared/models/reporte.model';
import { TooltipItem } from 'chart.js'; 

@Component({
  selector: 'app-estadistica-habito',
  standalone: true,
  imports: [MatListModule, MatCardModule, MatProgressBarModule, MatIconModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './estadistica-habito.component.html',
  styleUrls: ['./estadistica-habito.component.scss'],
})
export class EstadisticaHabitoComponent implements OnInit {
  selectedHabitoId: number = 0;
  habitos: any[] = []; // Lista de hábitos
  seguimientos: SeguimientoDTO[] = [];
  progressChart: any;
  totalSeguimientos: number = 0;
  totalTiempoInvertido: number = 0;
  porcentajeCumplido: number = 0;

  constructor(
    private habitoService: HabitoService,
    private seguimientoService: SeguimientoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHabitos();
  }

  loadHabitos(): void {
    this.habitoService.getHabitos().subscribe({
      next: (response) => {
        this.habitos = response;
        if (this.habitos.length > 0) {
          // Si hay hábitos, seleccionamos el primero por defecto
          this.selectedHabitoId = this.habitos[0].id;
          this.loadSeguimientos();
        }
      },
      error: () => {
        this.snackBar.open('Error al cargar los hábitos.', 'Cerrar', { duration: 3000 });
      },
    });
  }

  onHabitoSelected(habitoId: number): void {
    this.selectedHabitoId = habitoId;
    this.loadSeguimientos();
  }

loadSeguimientos(): void {
  if (this.selectedHabitoId === 0) return;

  this.seguimientoService.generarReportePorHabito(this.selectedHabitoId).subscribe({
    next: (reporte: ReporteDTO) => {
      if (reporte) {
        this.totalSeguimientos = reporte.totalSeguimientos || 0;
        this.totalTiempoInvertido = reporte.totalTiempoInvertido || 0;
        this.porcentajeCumplido = reporte.porcentajeCumplido || 0;
        this.seguimientos = reporte.seguimientos ? [...reporte.seguimientos] : []; // Maneja seguimientos nulos
        this.updateProgressChart();
      } else {
        this.snackBar.open('No se encontraron datos de reporte.', 'Cerrar', { duration: 3000 });
        this.seguimientos = []; // Asegúrate de reiniciar los datos en caso de error
      }
    },
    error: () => {
      this.snackBar.open('Error al cargar los seguimientos.', 'Cerrar', { duration: 3000 });
      this.seguimientos = []; // También maneja errores
    },
  });
}


  // Método para obtener el porcentaje de progreso
  getProgressPercentage(): number {
    if (this.seguimientos.length === 0) return 0;

    const completedCount = this.seguimientos.filter(
      (seguimiento) => seguimiento.estado === 'FINALIZADO'
    ).length;
    const total = this.seguimientos.length;
    return (completedCount / total) * 100;
  }

  // Método para actualizar el gráfico de progreso
  updateProgressChart(): void {
    const progress = this.getProgressPercentage();
    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;
  
    if (!ctx) {
      console.error('Canvas no encontrado.');
      return; // Si el canvas no se encuentra, no se puede dibujar el gráfico
    }
  
    if (this.progressChart) {
      // Solo actualizar el progreso, sin volver a renderizar el gráfico entero.
      this.progressChart.data.datasets[0].data = [progress, 100 - progress];
      this.progressChart.update();
    } else {
      // Crear el gráfico solo si no existe uno
      this.createProgressChart(progress, ctx);
    }
  }
  
  createProgressChart(progress: number, ctx: HTMLCanvasElement): void {
    const remaining = 100 - progress; // Calcula el restante
    let accumulatedProgress = 0;
  
    // Calculamos el progreso acumulado
    // Aquí, asumimos que 'seguimientos' es un arreglo de objetos que contiene el porcentaje del progreso de cada seguimiento
    const progresoAcumulado = this.seguimientos.map((seguimiento, index) => {
      accumulatedProgress += seguimiento.porcentajeCumplido; // Acumulamos el progreso
      return accumulatedProgress; // Devolvemos el progreso acumulado hasta el índice actual
    });
  
    // Si no hay seguimientos, el progreso acumulado debe ser 0
    if (this.seguimientos.length === 0) {
      progresoAcumulado.push(0);
    }
  
    // Agregamos el progreso restante al final
    const remainingData = new Array(progresoAcumulado.length).fill(remaining);
  
    this.progressChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.seguimientos.map((_, index) => `Seguimiento ${index + 1}`), // Etiquetas con el número de seguimiento
        datasets: [
          {
            type: 'bar',
            label: 'Progreso Acumulado',
            data: progresoAcumulado, // Datos del progreso acumulado
            backgroundColor: '#4caf50',
            borderColor: '#388e3c',
            borderWidth: 1,
          },
          {
            type: 'line',
            label: 'Restante',
            data: remainingData, // Datos del restante
            borderColor: '#e0e0e0',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100, // El máximo para mostrar el 100%
          },
        },
    plugins: {
  tooltip: {
    callbacks: {
      label: (context: TooltipItem) => `${context.dataset.label}: ${Math.round(context.raw as number)}%`, // Definimos el tipo de 'context'
    },
  },
  legend: {
    display: true,
  },
},
      },
    });
  }
  
  
  


  // Método para ver detalles de un seguimiento
  verDetalles(seguimientoId: number): void {
    this.router.navigate([`/seguimiento/detalles/`, seguimientoId]);
  }
}

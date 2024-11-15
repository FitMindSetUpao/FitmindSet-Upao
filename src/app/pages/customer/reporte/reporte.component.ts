import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReporteService } from '../../../core/services/reporte.service';
import { ReporteDTO } from '../../../../app/shared/models/reporte.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  reporte: ReporteDTO | null = null;

  constructor(
    private route: ActivatedRoute, 
    private reporteService: ReporteService
  ) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      const metaId = Number(params.get('id')); 
      if (metaId) {
        this.reporteService.obtenerReporte(metaId).subscribe(
          (data: ReporteDTO) => {
            this.reporte = data;
          },
          (error) => {
            console.error('Error al obtener el reporte:', error);
          }
        );
      }
    });
  }

  calcularFechaProyectada(): string {
    if (!this.reporte || this.reporte.porcentajeCumplido <= 0) {
      return 'Sin datos suficientes para estimar';
    }

    const diasRestantes = ((this.reporte.totalTiempoInvertido * 100) / this.reporte.porcentajeCumplido) - this.reporte.totalTiempoInvertido;
    const fechaProyectada = new Date();
    fechaProyectada.setDate(fechaProyectada.getDate() + diasRestantes);
    return fechaProyectada.toDateString();
  }

  generarRecomendaciones(): string {
    if (!this.reporte) return '';
    const porcentaje = this.reporte.porcentajeCumplido;

    if (porcentaje < 50) return 'Intenta incrementar el tiempo diario para mejorar el progreso.';
    if (porcentaje < 75) return '¡Buen trabajo! Mantén el ritmo.';
    if (porcentaje < 100) return 'Estás cerca, sigue así para completar la meta.';
    return '¡Felicidades! Has alcanzado tu meta.';
  }
}

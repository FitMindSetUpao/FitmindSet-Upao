import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'services/reporte.service';
import { ReporteDTO } from '././models/reporte.model';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  reporte: ReporteDTO | null = null;

  constructor(private reporteService: ReporteService) { }

  ngOnInit(): void {
    const metaId = 1; // Cambia esto por el ID dinámico o parámetro de ruta
    this.reporteService.obtenerReporte(metaId).subscribe(
      (data: ReporteDTO) => {
        this.reporte = data;
      },
      (error) => {
        console.error('Error al obtener el reporte:', error);
      }
    );
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

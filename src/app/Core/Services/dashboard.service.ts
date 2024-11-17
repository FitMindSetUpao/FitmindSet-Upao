import { Injectable } from '@angular/core';
import { DashboardItem } from '../../Shared/Components/Models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private items: DashboardItem[] = [
    {
      titulo: 'Recursos',
      descripcion: 'Accede a la lista completa de recursos disponibles. Aquí podrás consultar toda la información que necesitas.',
      icono: 'visibility',
      botonTexto: 'Recursos',
      ruta: '/recursos'
    },
    {
      titulo: 'Reporte de Recurso',
      descripcion: 'Genera un reporte detallado de los recursos disponibles. Puedes filtrar por categoría y fecha.',
      icono: 'assessment',
      botonTexto: 'Reporte de Recurso',
      ruta: '/reporte-recurso'
    },
    {
      titulo: 'Foros',
      descripcion: 'Visualizar los foros de discusión para intercambiar ideas y experiencias con otros usuarios. Comparte tu conocimiento.',
      icono: 'forum',
      botonTexto: 'Ver Foros',
      ruta: '/foro'
    },
    {
      titulo: 'Ver Recursos',
      descripcion: 'Accede a la lista completa de recursos disponibles. Aquí podrás consultar toda la información que necesitas.',
      icono: 'visibility',
      botonTexto: 'Ver Recursos',
      ruta: '/ver-recursos'
    }
  ];

  getDashboardItems(): DashboardItem[] {
    return this.items;
  }
}

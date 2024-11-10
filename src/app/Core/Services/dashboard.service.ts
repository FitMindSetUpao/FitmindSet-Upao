import { Injectable } from '@angular/core';
import { DashboardItem } from '../../Shared/Components/Models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private items: DashboardItem[] = [
    {
      titulo: 'Crear Recurso',
      descripcion: 'Utiliza esta opción para añadir nuevos recursos a la plataforma. Completa el formulario con toda la información necesaria.',
      icono: 'add_circle',
      botonTexto: 'Crear Recurso',
      ruta: '/crear-recurso'
    },
    {
      titulo: 'Actualizar Recurso',
      descripcion: 'Aquí puedes modificar los detalles de los recursos existentes. Asegúrate de tener los datos correctos antes de guardar.',
      icono: 'edit',
      botonTexto: 'Actualizar Recurso',
      ruta: '/actualizar-recurso'
    },
    {
      titulo: 'Reporte de Recurso',
      descripcion: 'Genera un reporte detallado de los recursos disponibles. Puedes filtrar por categoría y fecha.',
      icono: 'assessment',
      botonTexto: 'Reporte de Recurso',
      ruta: '/reporte-recurso'
    },
    {
      titulo: 'Crear Foro',
      descripcion: 'Crea un nuevo foro de discusión para intercambiar ideas y experiencias con otros usuarios. Comparte tu conocimiento.',
      icono: 'forum',
      botonTexto: 'Crear Foro',
      ruta: '/crear-foro'
    },
    {
      titulo: 'Ver Recursos',
      descripcion: 'Accede a la lista completa de recursos disponibles. Aquí podrás consultar toda la información que necesitas.',
      icono: 'visibility',
      botonTexto: 'Ver Recursos',
      ruta: '/recursos'
    }
  ];

  getDashboardItems(): DashboardItem[] {
    return this.items;
  }
}

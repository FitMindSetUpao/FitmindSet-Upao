import { Routes } from '@angular/router';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { ReporteComponent } from './reporte/reporte.component';
import { reporteGuard } from '../../core/guards/reporte.guard'; // Importa el guard

export const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
  },
  {
    path: 'reporte/:id', 
    component: ReporteComponent,
    canActivate: [reporteGuard] 
  }
];

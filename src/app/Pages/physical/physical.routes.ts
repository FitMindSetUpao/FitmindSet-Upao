import { Routes } from '@angular/router';
import { PhysicalComponent } from './physical.component';
import {AuthGuard} from '../../Core/Guard/auth.guard';

// Configuración de las rutas para el módulo de 'Physical'
export const physicalRoutes: Routes = [
  {
    path: '',
    component: PhysicalComponent,
    canActivate: [AuthGuard], // Añadir aquí los guards necesarios
  }
];

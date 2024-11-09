import { Routes } from '@angular/router';
import { ForoComponent } from './foro.component';
import { AuthGuard } from '../../Core/Guard/auth.guard';

export const foroRoutes: Routes = [
  {
    path: '',
    component: ForoComponent,
    canActivate: [AuthGuard], // Añadir protección de ruta si es necesario
  }
];

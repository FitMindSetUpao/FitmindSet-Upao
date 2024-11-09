import { Routes } from '@angular/router';
import { ForoDetalleComponent } from './foro-detalle.component';
import { AuthGuard } from '../../Core/Guard/auth.guard';

export const foroDetalleRoutes: Routes = [
  {
    path: '',
    component: ForoDetalleComponent,
    canActivate: [AuthGuard]
  }
];

import { Routes } from '@angular/router';
import { LayoutComponent } from './Shared/Components/Layout/layout.component';
import { foroRoutes } from './Pages/foro/foro.routes';
import { foroDetalleRoutes } from './Pages/foro-detalle/foro-detalle.routes';
import { perfilRoutes } from './Pages/perfil/perfil.routes';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'foro', children: foroRoutes },
      { path: 'foro-detalle', children: foroDetalleRoutes },
      { path: 'perfil', children: perfilRoutes }
    ]
  }
];

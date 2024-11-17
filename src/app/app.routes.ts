import { Routes } from '@angular/router';
import { LayoutComponent } from './Shared/Components/Layout/layout.component';
import { foroRoutes } from './Pages/foro/foro.routes';
import { foroDetalleRoutes } from './Pages/foro-detalle/foro-detalle.routes';
import { perfilRoutes } from './Pages/perfil/perfil.routes';
import { DashboardComponent } from './Shared/Components/dashboard/dashboard.component';
import { recursoListRoutes } from './Pages/recurso-management/recurso-list/recurso-list.routes';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'recursos', children: recursoListRoutes },
      { path: 'foro', children: foroRoutes },
      { path: 'foro-detalle', children: foroDetalleRoutes },
      { path: 'perfil', children: perfilRoutes },
    ],
  },
];

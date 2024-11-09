import { Routes } from '@angular/router';
import { LayoutComponent } from './Shared/Components/Layout/layout.component';
import { foroRoutes } from './Pages/foro/foro.routes';
import { foroDetalleRoutes } from './Pages/foro-detalle/foro-detalle.routes';
import { perfilRoutes } from './Pages/perfil/perfil.routes';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/foro', pathMatch: 'full' },
      { path: 'foro', children: foroRoutes },
      { path: 'foro-detalle', children: foroDetalleRoutes },
      { path: 'perfil', children: perfilRoutes }  // Ruta de perfil
    ]
  }
];

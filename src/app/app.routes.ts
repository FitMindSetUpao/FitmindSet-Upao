import { authGuard } from './core/guards/auth.guard';
import { authInverseGuard } from './core/guards/auth-inverse.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '', redirectTo: 'auth/register/customer', pathMatch: 'full'},
  { 
    path: 'auth', 
    loadChildren: () => import('./pages/auth/auth.routes').then(a => a.authRoutes), 
    canActivate: [authInverseGuard] 
  },
  { 
    path: 'customer', 
    loadChildren: () => import('./pages/customer/customer.routes').then(a => a.customerRoutes), 
    canActivate: [authGuard] 
  },
  {
    path: 'autor',
    loadChildren:() =>import('./pages/autor/autor.routes').then(m => m.autorRoutes),
    canActivate:[authGuard]
  }

];

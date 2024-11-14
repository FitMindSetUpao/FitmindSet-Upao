import { Routes } from '@angular/router';
import { RegisterResourceComponent} from './register-resource.component';
import {AuthGuard} from '../../Core/Guard/auth.guard';

export const registerResourceRoutes: Routes = [
  { path: 'register-resource',
    component: RegisterResourceComponent,
    canActivate: [AuthGuard]
  },
]

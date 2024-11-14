import { Routes } from '@angular/router';
import { PasswordRecoveryRequestComponent } from './password-recovery-request.component';
import { AuthGuard } from '../../Core/Guard/auth.guard';

export const passwordRecoveryRoutes: Routes = [
  {
    path: 'password-recovery',
    component: PasswordRecoveryRequestComponent,
    canActivate: [AuthGuard],
  }
];

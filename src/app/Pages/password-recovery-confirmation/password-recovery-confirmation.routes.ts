import { Routes } from '@angular/router';
import { PasswordRecoveryConfirmationComponent } from './password-recovery-confirmation.component';
import {AuthGuard} from '../../Core/Guard/auth.guard';

export const passwordRecoveryConfirmationRoutes: Routes = [
  {
    path: 'password-confirmation',
    component: PasswordRecoveryConfirmationComponent,
    canActivate: [AuthGuard],
  },
];

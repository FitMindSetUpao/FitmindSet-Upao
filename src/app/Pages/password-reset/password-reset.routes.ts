import { Route } from '@angular/router';
import { PasswordResetComponent } from './password-reset.component';

export const passwordResetRoutes: Route[] = [
  {
    path: 'reset-password',
    component: PasswordResetComponent
  }
];

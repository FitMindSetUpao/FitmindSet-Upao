import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';


import { RegisterComponent } from './register/register.component';
import { PasswordRecoveryRequestComponent } from './recuperacion/password-recovery-request/password-recovery-request.component'; 
import { PasswordRecoveryConfirmationComponent } from './recuperacion/password-recovery-confirmation/password-recovery-confirmation.component';
import { PasswordResetComponent } from './recuperacion/password-reset/password-reset.component';
import { LoginComponent } from './login/login.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {path: 'password-recovery',component: PasswordRecoveryRequestComponent},
      {path: 'password-confirmation',component: PasswordRecoveryConfirmationComponent},
      { path: 'reset-password', component: PasswordResetComponent},

    ]
  }
];

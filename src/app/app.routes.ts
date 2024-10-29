import { Routes } from '@angular/router';
import { PhysicalComponent } from './Pages/physical/physical.component';
import { PasswordRecoveryRequestComponent} from './Shared/Components/password-recovery-request/password-recovery-request.component';
import { passwordRecoveryRoutes} from './Shared/Components/password-recovery-request/password-recovery-request.routes';

export const routes: Routes = [
  { path: 'reg', component: PhysicalComponent},
  { path: 'pasword-recovery', component: PasswordRecoveryRequestComponent},
  ...passwordRecoveryRoutes,
  { path: '**', redirectTo: '/login' },
];

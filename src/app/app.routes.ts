import { Routes } from '@angular/router';
import { PhysicalComponent } from './Pages/physical/physical.component';
import { passwordRecoveryRoutes} from './Pages/password-recovery-request/password-recovery-request.routes';
import { passwordRecoveryConfirmationRoutes } from './Pages/password-recovery-confirmation/password-recovery-confirmation.routes';
import { passwordResetRoutes} from './Pages/password-reset/password-reset.routes';
import { registerResourceRoutes} from './Pages/register-resource/register-resource.routes';

export const routes: Routes = [
  { path: 'reg', component: PhysicalComponent},
  ...passwordRecoveryConfirmationRoutes,
  ...passwordRecoveryRoutes,
  ...passwordResetRoutes,
  ...registerResourceRoutes,
  { path: '**', redirectTo: '/reg' },
];

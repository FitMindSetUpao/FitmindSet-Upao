import { Routes } from '@angular/router';
import { PhysicalComponent } from './Pages/physical/physical.component';
import { passwordRecoveryRoutes} from './Pages/password-recovery-request/password-recovery-request.routes';
import { passwordRecoveryConfirmationRoutes } from './Pages/password-recovery-confirmation/password-recovery-confirmation.routes';
import { passwordResetRoutes} from './Pages/password-reset/password-reset.routes';

export const routes: Routes = [
  { path: 'reg', component: PhysicalComponent},
  ...passwordRecoveryConfirmationRoutes,
  ...passwordRecoveryRoutes,
  ...passwordResetRoutes,
  { path: '**', redirectTo: '/reg' },
];
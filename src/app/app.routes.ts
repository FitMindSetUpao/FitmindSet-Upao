import { Routes } from '@angular/router';
import { PhysicalComponent } from './Pages/physical/physical.component';
import { passwordRecoveryRoutes} from './Pages/password-recovery-request/password-recovery-request.routes';

export const routes: Routes = [
  { path: 'reg', component: PhysicalComponent},
  ...passwordRecoveryRoutes,
  { path: '**', redirectTo: '/reg' },
];

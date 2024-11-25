import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionPlansComponent } from './subscription/subscription-plans.component';

const routes: Routes = [
  {
    path: 'subscription',
    loadChildren: () =>
      import('./subscription/subscription.module').then(m => m.SubscriptionModule)
  },
  // Otras rutas existentes...
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}

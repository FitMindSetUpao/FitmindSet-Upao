import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionPlansComponent } from './subscription-plans.component';

const routes: Routes = [
  { path: '', component: SubscriptionPlansComponent },
  // Puedes agregar más rutas aquí si es necesario, como un detalle de la suscripción
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule {}

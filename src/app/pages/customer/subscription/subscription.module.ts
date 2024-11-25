import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionPlansComponent } from './subscription-plans.component';
import { SubscriptionRoutingModule } from './subscription-routing.module';

@NgModule({
  declarations: [SubscriptionPlansComponent],
  imports: [CommonModule, SubscriptionRoutingModule]
})
export class SubscriptionModule {}

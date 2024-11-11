import { Routes } from '@angular/router';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { HabitoFormComponent } from './Habitos-management/Habitos/habito-form/habito-form.component';
import { HabitoListComponent } from './Habitos-management/Habitos/habito-list/habito-list.component';
import { LayoutComponent } from './Habitos-management/layout/layout.component';

export const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
    {path: 'habitos', component: CustomerLayoutComponent}
    ]
  },
  {
    path: 'habitos',
    component: LayoutComponent, 
    children: [
      { path: 'crear', component: HabitoFormComponent },
      { path: 'habitos/edit/:id', component: HabitoFormComponent },
      { path: 'list', component: HabitoListComponent }
    ]
  }
];

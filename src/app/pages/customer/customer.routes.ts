import { Routes } from '@angular/router';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { HabitoFormComponent } from './Habitos-management/Habitos/habito-form/habito-form.component';
import { HabitoListComponent } from './Habitos-management/Habitos/habito-list/habito-list.component';
import { LayoutComponent } from './Habitos-management/layout/layout.component';
import { UserProfileComponent } from '../../shared/components/user-profile/user-profile.component';
import { MetaListComponent } from './Habitos-management/Meta-management/meta-list/meta-list.component';
import { EstadisticaHabitoComponent } from './Habitos-management/Habitos-Report/estadistica-habito/estadistica-habito.component';
import { ActivadListComponent } from './Habitos-management/actividad-management/activad-list/activad-list.component';

export const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,  // Este es el componente principal
    children: [
      { path: 'mi-perfil', component: UserProfileComponent },
      { path: 'habitos', component: HabitoListComponent },  // Ruta para ver los hábitos
    ]
  },
  {
    path: 'habitos',   // Componente que manejará los hábitos
    component: LayoutComponent,
    children: [
      { path: 'crear', component: HabitoFormComponent },   // Ruta para crear un nuevo hábito
      { path: 'edit/:id', component: HabitoFormComponent },  // Ruta para editar un hábito
      { path: 'list', component: HabitoListComponent },    // Ruta para listar los hábitos
      { path: 'metas', component: MetaListComponent },     // Ruta para ver las metas
      { path: 'reportes', component: EstadisticaHabitoComponent },  // Ruta para ver los reportes de hábitos
      { path: 'actividad', component: ActivadListComponent },  // Ruta para ver las actividades
      { path: 'mi-perfil', component: UserProfileComponent },
    ]
  },
];

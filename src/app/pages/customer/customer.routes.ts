import { Routes } from '@angular/router';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { HabitoFormComponent } from './Habitos-management/Habitos/habito-form/habito-form.component';
import { HabitoListComponent } from './Habitos-management/Habitos/habito-list/habito-list.component';
import { LayoutComponent } from './Habitos-management/layout/layout.component';
import { UserProfileComponent } from '../../shared/components/user-profile/user-profile.component';
import { MetaListComponent } from './Habitos-management/Meta-management/meta-list/meta-list.component';
import { MetaFormComponent } from './Habitos-management/Meta-management/meta-form/meta-form.component';
import { EstadisticaHabitoComponent } from './Habitos-management/Habitos-Report/estadistica-habito/estadistica-habito.component';
import { ActivadListComponent } from './Habitos-management/actividad-management/activad-list/activad-list.component';
import { MetaDetallesComponent } from './Habitos-management/Meta-management/meta-detalles/meta-detalles.component';
import { ActividadFormComponent } from './Habitos-management/actividad-management/actividad-form/actividad-form.component';
import { ForoBusquedaComponent } from './Comunidad/foro-busqueda/foro-busqueda.component';
import { ForoCrearComponent } from './Comunidad/foro-crear/foro-crear.component';
import { ForoComentariosComponent } from './Comunidad/foro-comentarios/foro-comentarios.component';
import { PaymentComponent } from './payment/payment.component';
import {CartComponent} from './purchases/cart/cart.component';

export const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
      { path: 'mi-perfil', component: UserProfileComponent },
      { path: 'habitos', component: HabitoListComponent },
      { path: 'metas', component: MetaListComponent}, //esto lo
    ]
  },
  {
    path: 'habitos',
    component: LayoutComponent,
    children: [
      { path: 'crear', component: HabitoFormComponent },
      { path: 'edit/:id', component: HabitoFormComponent },
      { path: 'list', component: HabitoListComponent },
      { path: 'metas/list', component: MetaListComponent },
      { path: 'metas/crear/:habitoId', component: MetaFormComponent },
      { path: 'habitos/metas', component: MetaListComponent },
      { path: 'habitos/metas/:habitoId', component: MetaFormComponent },
      { path: 'metas/edit/:id', component: MetaFormComponent },
      { path: 'reportes', component: EstadisticaHabitoComponent },
      { path: 'actividad', component: ActivadListComponent },
      { path: 'mi-perfil', component: UserProfileComponent },
      { path: 'metas/:habitoId', component: MetaDetallesComponent },
      { path: 'metas/editar/:metaId', component: MetaFormComponent },
      { path: 'habitos/actividad', component: ActivadListComponent },
      { path: 'cart', component: CartComponent },
      // Corregido: Solo una ruta para ActividadFormComponent
      { path: 'metas/actividad/:metaId', component: ActividadFormComponent }
    ]
  },

    {
      path: 'foro', component: ForoBusquedaComponent
    },
    {
      path: 'foro/foro-co', component: ForoComentariosComponent
    },
    {
      path: 'foro/foro-cr', component: ForoCrearComponent
    },

  {
    path: 'customer/pagos-suscripciones', component: PaymentComponent
  },
];

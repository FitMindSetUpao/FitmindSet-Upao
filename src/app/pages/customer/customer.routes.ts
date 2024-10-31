import { Routes } from '@angular/router';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { HabitosComponent } from '../customer/habitos/habitos/habitos.component';
import { CrearMetaComponent } from './habitos/metas/crear-meta/crear-meta.component';
import { MetasComponent } from './habitos/metas/metas.component'; // Corrige la importación
import { SeguimientoComponent } from './habitos/seguimiento/seguimiento.component'; // Corrige la importación

export const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
      { path: 'habitos', component: HabitosComponent }, // Eliminar el slash inicial
      { path: 'habitos/crear', component: HabitosComponent }, // Usar el mismo componente si es necesario
      { path: 'habitos/reporte', component: HabitosComponent }, // Usar el mismo componente si es necesario
      { path: 'metas/crear/:id', component: CrearMetaComponent },
      { path: 'metas/actualizar/:id', component: CrearMetaComponent },
      { path: 'metas/eliminar/:id', component: CrearMetaComponent },
      { path: 'metas/habito/:id', component: MetasComponent },
      { path: 'seguimientos/registrar', component: SeguimientoComponent },
      { path: 'seguimientos/eliminar/:id', component: SeguimientoComponent },
      { path: 'seguimientos/reporte/:id', component: SeguimientoComponent }, // reporte estadístico de cada meta
      { path: 'seguimientos/habitos/:id', component: SeguimientoComponent }
    ]
  }
];

import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { RecursoListComponent } from "./recurso-management/recurso-list/recurso-list.component";
import { RecursoFormComponent } from "./recurso-management/recurso-form/recurso-form.component";
import { UserProfileComponent } from "../../shared/components/user-profile/user-profile.component";
import { AuthLayoutComponent } from "../auth/auth-layout/auth-layout.component";
export const autorRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: 'recursos/crear',component: RecursoFormComponent},
            {path: 'recursos/edit/:recursoid',component: RecursoFormComponent},
            {path: 'recursos/list', component: RecursoListComponent},
            {path: 'mi-perfil', component: UserProfileComponent},
            {path: 'mi-dashboard', component: AuthLayoutComponent},
        ]
    }
]
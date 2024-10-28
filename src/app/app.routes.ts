import { Routes } from '@angular/router';
import { ForumComponent } from './pages/forum/forum.component';
import { RegistroComponent } from './pages/registro/registro.component';

export const routes: Routes = [
    {
        path: 'forum',
        component: ForumComponent
    },
    {
        path: 'registro',
        component: RegistroComponent
    }
]

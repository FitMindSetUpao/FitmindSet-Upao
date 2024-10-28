import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ForumComponent } from './pages/forum/forum.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'footer',
        component: FooterComponent
    },
    {
        path: 'forum',
        component: ForumComponent
    }
];

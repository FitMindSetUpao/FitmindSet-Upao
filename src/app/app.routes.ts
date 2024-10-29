import { Routes } from '@angular/router';
import { ForumComponent } from './pages/forum/forum.component';
import { RegisterComponent } from './pages/register/register.component';
import { PaymentComponent } from './pages/payment/payment.component';

export const routes: Routes = [
    {
        path: 'forum',
        component: ForumComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'payment',
        component: PaymentComponent
    }
]

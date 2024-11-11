import { Routes } from '@angular/router';
import { UpdateFitComponent } from './pages/update-fit/update-fit.component';
import { UnsavedChangesGuard } from './core/guards/unsaved-changes.guard';

export const routes: Routes = [
    {
        path: 'update',
        component: UpdateFitComponent,
        canDeactivate: [UnsavedChangesGuard]
    }
];

// unsaved-changes.guard.ts
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { UpdateFitComponent } from '../../pages/update-fit/update-fit.component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<UpdateFitComponent> {
  canDeactivate(component: UpdateFitComponent): boolean {
    if (component.hasUnsavedChanges()) {
      return confirm("Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?");
    }
    return true;
  }
}

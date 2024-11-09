import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { NavbarComponent } from './Shared/Components/Navbar/navbar.component';
import { ForoComponent } from './Pages/foro/foro.component';
import { ForoDetalleComponent } from './Pages/foro-detalle/foro-detalle.component';
import { MaterialModule } from './Core/Module/material.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(MaterialModule, NavbarComponent, ForoComponent, ForoDetalleComponent)
  ]
};

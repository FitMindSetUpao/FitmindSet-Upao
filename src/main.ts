import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { tokenInterceptor} from './app/Core/Interceptor/token.interceptor';
import {MatSnackBar} from '@angular/material/snack-bar';
import {routes} from './app/app.routes';
import {authInterceptor} from './app/Core/Interceptor/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    // Proveedor de rutas, que incluye las rutas definidas en app.routes.ts
    provideRouter(routes),
    // Cliente HTTP con los interceptores
    provideHttpClient(withInterceptors([authInterceptor, tokenInterceptor])),
    // Servicio de Angular Material para Snackbar
    MatSnackBar
  ]
}).catch((err) => console.error(err));

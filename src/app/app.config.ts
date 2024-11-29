import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Mejora el rendimiento agrupando eventos en el `Zone`
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Configuración de rutas
    provideRouter(routes),

    // Animaciones asíncronas (si Angular es compatible)
    provideAnimationsAsync(),

    // Cliente HTTP con interceptor JWT
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ]
};

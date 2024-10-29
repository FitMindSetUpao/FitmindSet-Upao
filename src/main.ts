import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { PhysicalComponent } from './app/Pages/physical/physical.component';
import { provideRouter } from '@angular/router';
import { physicalRoutes } from './app/Pages/physical/physical.routes';
import { tokenInterceptor} from './app/Core/Interceptor/token.interceptor';

bootstrapApplication(AppComponent, appConfig, )
  .catch((err) => console.error(err));

bootstrapApplication(PhysicalComponent, {
  providers: [provideHttpClient()]
}).catch(err => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'physical', children: physicalRoutes },
      { path: '', redirectTo: '/physical', pathMatch: 'full' },
      // Otras rutas aquí
    ]),
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ]
}).catch((err) => console.error(err));

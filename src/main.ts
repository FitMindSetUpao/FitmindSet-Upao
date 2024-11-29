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
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, tokenInterceptor])),
    MatSnackBar
  ]
}).catch((err) => console.error(err));

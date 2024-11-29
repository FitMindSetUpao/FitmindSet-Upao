import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { tokenInterceptor} from './app/Core/Interceptor/token.interceptor';
import {MatSnackBar} from '@angular/material/snack-bar';
import {routes} from './app/app.routes';
import {authInterceptor} from './app/Core/Interceptor/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, tokenInterceptor])),
    MatSnackBar, provideAnimationsAsync()
  ]
}).catch((err) => console.error(err));
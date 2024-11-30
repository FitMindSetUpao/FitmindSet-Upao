
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.services';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService); // Inyectar el servicio de almacenamiento
  const authData = storageService.getAuthData(); // Obtener los datos de autenticación almacenados

  if (authData && authData.token) {
    // Clonar la solicitud y agregar el encabezado de autorización con el token
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authData.token}`),
    });
    return next(authReq); // Pasar la solicitud modificada al siguiente interceptor o al backend
  }

  // Si no hay token, continuar con la solicitud original
  return next(req);
};

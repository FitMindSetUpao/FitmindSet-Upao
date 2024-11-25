import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:8080/subscription'; // URL base del backend
  constructor(private http: HttpClient) {}

  // Método para iniciar la suscripción
  subscribe(planId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/subscribe`, { planId }).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo global de errores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      console.error(
        `Error del servidor (código ${error.status}): ${error.error}`
      );
    }
    return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente.');
  }
}

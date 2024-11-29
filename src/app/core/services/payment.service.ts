import {inject, Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable, tap, throwError} from 'rxjs';
import { environment } from '../../../environments/environment';
import { Purchase } from '../../shared/models/purchase.model';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseURL = `${environment.baseURL}/purchases`;
  private http = inject(HttpClient);

  getUserName(): Observable<{ name: string }> {
    return this.http.get<{ name: string }>(`${this.baseURL}/user`);
  }

  getPurchaseHistory(token: string): Observable<Purchase[]> {
    const headers = { Authorization: `Bearer ${token}` }; // Encabezado con token
    return this.http.get<Purchase[]>(`${this.baseURL}/reporte`, { headers }).pipe(
      tap(() => console.log('Historial de compras obtenido con éxito')),
      catchError((error) => {
        console.error('Error al obtener el historial de compras:', error);
        return throwError(() => new Error('Error al cargar el historial de compras.'));
      })
    );
  }
}

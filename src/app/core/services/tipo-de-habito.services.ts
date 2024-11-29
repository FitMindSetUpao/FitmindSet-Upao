// src/app/core/services/tipo-de-habito.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDeHabito } from '../../shared/models/tipo-de-habito.model';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { tipoDeRecursoResponse } from '../../shared/models/tipoDeRecurso.model';
import { of } from 'rxjs';
import { tiposSuscripcion} from '../../shared/models/tiposSuscripcion.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDeHabitoService {
  private baseUrl = `${environment.baseURL}/tipos-de-habito`;

  constructor(private http: HttpClient) {}

  getAllTiposDeHabitos(): Observable<TipoDeHabito[]> {
    return this.http.get<TipoDeHabito[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('Error al obtener los tipos de hábitos', error);
        return of([]);
      })
    );
  }
  getAllTiposDeRecurso(): Observable<tipoDeRecursoResponse[]> {
    return this.http.get<tipoDeRecursoResponse[]>(`${this.baseUrl}/tipos-de-recurso`).pipe(
      catchError(error => {
        console.error('Error al obtener los tipos de recursos', error);
        return of([]);
      })
    );
  }
  getAllTiposSuscripcion(): Observable<tiposSuscripcion[]> {
    const tiposSuscripcionUrl = `${this.baseUrl}/tipos-suscripcion`;
    return this.http.get<tiposSuscripcion[]>(tiposSuscripcionUrl).pipe(
      catchError(error => {
        console.error('Error al obtener los tipos de suscripción', error);
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }


}

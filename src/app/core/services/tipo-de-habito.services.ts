// src/app/core/services/tipo-de-habito.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDeHabito } from '../../shared/models/tipo-de-habito.model';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
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


}

// src/app/core/services/tipo-de-habito.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDeHabito } from '../../shared/models/tipo-de-habito.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDeHabitoService {
  private baseUrl = 'http://localhost:8080/api/v1/tipos-de-habito';

  constructor(private http: HttpClient) {}

  getTiposDeHabito(): Observable<TipoDeHabito[]> {
    return this.http.get<TipoDeHabito[]>(this.baseUrl);
  }
}

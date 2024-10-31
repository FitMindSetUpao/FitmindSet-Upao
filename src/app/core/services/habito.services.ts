import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habito } from '../../shared/models/habito.model';

@Injectable({
  providedIn: 'root'
})
export class HabitoService {
  private baseUrl = 'http://localhost:8080/api/v1/habitos';

  constructor(private http: HttpClient) {}

  obtenerHabitos(): Observable<Habito[]> {
    return this.http.get<Habito[]>(`${this.baseUrl}/reporte`);
  }

  crearHabito(habito: ): Observable<Habito> {
    return this.http.post<Habito>(`${this.baseUrl}/crear`, habito);
  }
}

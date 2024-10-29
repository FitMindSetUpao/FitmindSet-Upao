import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReporteDTO } from '../models/reporte.model'; // Asegúrate de tener la interfaz definida

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private baseUrl = 'http://localhost:8080/api/reporte'; // URL de la API en Spring Boot

  constructor(private http: HttpClient) { }

  obtenerReporte(metaId: number): Observable<ReporteDTO> {
    return this.http.get<ReporteDTO>(`${this.baseUrl}/${metaId}`);
  }
}

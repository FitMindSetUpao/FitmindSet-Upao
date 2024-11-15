import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReporteDTO } from '../../shared/models/reporte.model'; 

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private baseUrl = 'http://localhost:8080/api/v1/seguimientos/reporte'; 

  constructor(private http: HttpClient) { }

  obtenerReporte(metaId: number): Observable<ReporteDTO> {
    return this.http.get<ReporteDTO>(`${this.baseUrl}/${metaId}`);
  }
}

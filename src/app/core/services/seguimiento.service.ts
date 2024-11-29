import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SeguimientoDTO } from '../../../shared/models/seguimiento.model';
import { ReporteDTO } from '../../shared/models/reporte.model';
import { SeguimientoResponse } from '../../shared/models/seguimiento-response.model';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {

  private apiUrl: string = `${environment.baseURL}/seguimientos`;

  constructor(private http: HttpClient) { }

  // Registrar un seguimiento
  registrarSeguimiento(seguimientoDTO: SeguimientoDTO, metaId: number): Observable<SeguimientoDTO> {
    return this.http.post<SeguimientoDTO>(`${this.apiUrl}/registrar/${metaId}`, seguimientoDTO);
}
  
  actualizarSeguimientoPorMetaId(metaId: number, seguimientoDTO: SeguimientoDTO) {
    return this.http.put<SeguimientoResponse>(`${this.apiUrl}meta/${metaId}`, seguimientoDTO);
  }


  eliminarSeguimiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  generarReporteEstadistico(metaId: number): Observable<ReporteDTO> {
    return this.http.get<ReporteDTO>(`${this.apiUrl}/reporte/${metaId}`, this.getHeaders());
  }

  // Generar un reporte estadístico por hábito
  generarReportePorHabito(habitoId: number): Observable<ReporteDTO> {
    return this.http.get<ReporteDTO>(`${this.apiUrl}/habito/${habitoId}`, this.getHeaders());
  }
  obtenerSeguimientosPorCustomer(seguimientoId: number): Observable<SeguimientoDTO[]> {
    return this.http.get<SeguimientoDTO[]>(`${this.apiUrl}/${seguimientoId}`);
  }
  generarReporte(metaId: number): Observable<SeguimientoDTO[]> {
    return this.http.get<SeguimientoDTO[]>(`${this.apiUrl}/reportes/${metaId}`, this.getHeaders());
  }
  getSegumientosDetailsById(seguimientoId: number):Observable<SeguimientoDTO> {
    return this.http.get<SeguimientoDTO>(`${this.apiUrl}/${seguimientoId}`);
   }
   getAllSeguimientos(): Observable<SeguimientoDTO[]> {
    return this.http.get<SeguimientoDTO[]>(`${this.apiUrl}/seguimientos`);
  }
  getSeguimientosByMetaId(metaId: number): Observable<SeguimientoDTO[]> {
    return this.http.get<SeguimientoDTO[]>(`${this.apiUrl}/seguimientosByMeta/${metaId}`);
  }
  
  
  
  
  // Método para obtener los headers con el token de autenticación (si es necesario)
  private getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('auth_token'); // Obtener el token de autenticación de localStorage o sesión
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}` 
      })
    };
  }
}

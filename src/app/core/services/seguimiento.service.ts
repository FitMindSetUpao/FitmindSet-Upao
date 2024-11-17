import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SeguimientoDTO } from '../../shared/models/reporte.model';
import { ReporteDTO } from '../../shared/models/reporte.model';

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


  // Actualizar un seguimiento
  actualizarSeguimiento(id: number, seguimientoDTO: SeguimientoDTO): Observable<SeguimientoDTO> {
    return this.http.put<SeguimientoDTO>(`${this.apiUrl}/actualizar/${id}`, seguimientoDTO, this.getHeaders());
  }

  // Eliminar un seguimiento
  eliminarSeguimiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`, this.getHeaders());
  }

  // Generar un reporte estadístico por meta
  generarReporteEstadistico(metaId: number): Observable<ReporteDTO> {
    return this.http.get<ReporteDTO>(`${this.apiUrl}/reporte/${metaId}`, this.getHeaders());
  }

  // Generar un reporte estadístico por hábito
  generarReportePorHabito(habitoId: number): Observable<ReporteDTO> {
    return this.http.get<ReporteDTO>(`${this.apiUrl}/habito/${habitoId}`, this.getHeaders());
  }
  obtenerSeguimientosPorCustomer(customerId: number): Observable<SeguimientoDTO[]> {
    return this.http.get<SeguimientoDTO[]>(`${this.apiUrl}/seguimientos/${customerId}`, this.getHeaders());
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

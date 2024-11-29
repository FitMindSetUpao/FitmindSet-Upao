import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetaDTO } from '../../shared/models/meta.model';
import { environment } from '../../../environments/environment';
import { MetaResponseDTO } from '../../shared/models/meta-response.model';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private apiUrl = `${environment.baseURL}/metas`;
  private http = inject(HttpClient);

  // Create a new meta
  crearMeta(habitoId: number, metaDTO: MetaDTO): Observable<MetaResponseDTO> {
    return this.http.post<MetaResponseDTO>(`${this.apiUrl}/crear/${habitoId}`, metaDTO);
  }

  // Update an existing meta
  actualizarMeta(metaId: number, metaDTO: MetaDTO): Observable<MetaResponseDTO> {
    return this.http.put<MetaResponseDTO>(`${this.apiUrl}/actualizar/${metaId}`, metaDTO);
  }

  // Delete a meta
  eliminarMeta(metaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${metaId}`);
  }

  // Get metas by habit ID
  obtenerMetasPorHabito(habitoId: number): Observable<MetaResponseDTO[]> {
    return this.http.get<MetaResponseDTO[]>(`${this.apiUrl}/habito/${habitoId}`);
  }

  // Get meta by metaId
  getMetaById(metaId: string): Observable<MetaResponseDTO> {
    return this.http.get<MetaResponseDTO>(`${this.apiUrl}/${metaId}`);
  }

  // Get metas by customer ID
  obtenerMetasPorCustomer(customerId: number): Observable<MetaResponseDTO[]> {
    return this.http.get<MetaResponseDTO[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  // Get habits by customer ID
  obtenerHabitosPorCustomer(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customer/${customerId}`);
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
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

  
  crearMeta(habitoId: number, metaDTO: MetaDTO): Observable<MetaResponseDTO> {
    return this.http.post<MetaResponseDTO>(`${this.apiUrl}/crear/${habitoId}`, metaDTO);
  }
  actualizarMeta(metaId: number, metaDTO: MetaDTO): Observable<MetaResponseDTO> {
    return this.http.put<MetaResponseDTO>(`${this.apiUrl}/actualizar/${metaId}`, metaDTO);
  }
  eliminarMeta(metaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${metaId}`);
  }
  obtenerMetasPorHabito(habitoId: number): Observable<MetaResponseDTO[]> {
    return this.http.get<MetaResponseDTO[]>(`${this.apiUrl}/habito/${habitoId}`);
  }
  getMetaById(metaId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${metaId}`);
  }
}

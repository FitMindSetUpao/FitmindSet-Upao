import { Injectable, inject } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meta } from '../../shared/models/meta.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private apiUrl = `${environment.baseURL}/metas`;
  private http = inject(HttpClient);

  
  crearMeta(habitoId: number, metaDTO: MetaDTO): Observable<MetaResponseDTO> {
    return this.http.post<MetaResponseDTO>(`${this.apiUrl}/crear/${habitoId}`, metaDTO);
  }

  // Actualizar una meta
  actualizarMeta(metaId: number, metaDTO: MetaDTO): Observable<MetaResponseDTO> {
    return this.http.put<MetaResponseDTO>(`${this.apiUrl}/actualizar/${metaId}`, metaDTO);
  }

  // Eliminar una meta
  eliminarMeta(metaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${metaId}`);
  }

  // Obtener metas por hábito
  obtenerMetasPorHabito(habitoId: number): Observable<MetaResponseDTO[]> {
    return this.http.get<MetaResponseDTO[]>(`${this.apiUrl}/habito/${habitoId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForoDTO } from '../../Shared/Components/Models/foro.model';
import { PublicacionDTO } from '../../Shared/Components/Models/publicacion.model';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForoService {
  private apiUrl = `${environment.apiUrl}/foros`;

  constructor(private http: HttpClient) {}

  // Obtener todos los foros
  getForos(): Observable<ForoDTO[]> {
    return this.http.get<ForoDTO[]>(`${this.apiUrl}`);
  }

  // Obtener un foro por ID
  getForo(id: number): Observable<ForoDTO> {
    return this.http.get<ForoDTO>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo foro
  createForo(foro: ForoDTO): Observable<ForoDTO> {
    return this.http.post<ForoDTO>(`${this.apiUrl}`, foro);
  }

  // Obtener publicaciones de un foro específico
  getPublicaciones(foroId: number): Observable<PublicacionDTO[]> {
    return this.http.get<PublicacionDTO[]>(`${this.apiUrl}/${foroId}/publicaciones`);
  }

  // Crear una nueva publicación en un foro
  createPublicacion(foroId: number, publicacion: PublicacionDTO): Observable<PublicacionDTO> {
    return this.http.post<PublicacionDTO>(`${this.apiUrl}/${foroId}/publicaciones`, publicacion);
  }
}

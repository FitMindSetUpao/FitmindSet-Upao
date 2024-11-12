import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../../shared/models/comentario.model';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = `${environment.baseURL}/comentarios`;

  constructor(private http: HttpClient) {}

  crearComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.apiUrl}/crear`, comentario);
  }

  obtenerComentariosPorGrupo(grupoId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/grupo/${grupoId}`);
  }

  obtenerRespuestas(comentarioId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/respuesta/${comentarioId}`);
  }
}
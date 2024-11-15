import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RecursoResponse } from '../../shared/models/recurso-response.model';
import { PageableResponse } from '../../shared/models/pageable.response.model';
import { Recurso } from '../../shared/models/recurso.model';
import { tipoDeRecursoResponse } from '../../shared/models/tipoDeRecurso.model';
@Injectable({
    providedIn: 'root'
  })
export class RecursoService{
  private baseUrl = `${environment.baseURL}/recursos`;
  private http = inject(HttpClient);

  getRecursoDetails(): Observable<RecursoResponse[]> {
    return this.http.get<RecursoResponse[]>(`${this.baseUrl}`);
  }
  paginateRecursos(page:number, size:number): Observable<PageableResponse<RecursoResponse>>{
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageableResponse<RecursoResponse>>(`${this.baseUrl}/page`,
      { params });
  }
  createRecursos(recurso: Recurso): Observable<RecursoResponse>{
    return this.http.post<RecursoResponse>(`${this.baseUrl}/registrar`, recurso);
  }
  updateRecurso(id:number, recurso: Recurso): Observable<RecursoResponse>{
    return this.http.put<RecursoResponse>(`${this.baseUrl}/actualizar/${id}`, recurso);
  }
  getRecursoDetailsById(id: number): Observable<RecursoResponse> {
    return this.http.get<RecursoResponse>(`${this.baseUrl}/${id}`);
  }

}
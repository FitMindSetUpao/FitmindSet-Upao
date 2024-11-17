import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';
import {RecursoPageResponse} from '../../Shared/Components/Models/recurso-page-response.model';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  private apiUrl = `${environment.apiUrl}/recursos`;

  constructor(private http: HttpClient) {}

  getRecursos(pageIndex: number, pageSize: number): Observable<RecursoPageResponse> {
    return this.http.get<RecursoPageResponse>(
      `${this.apiUrl}?page=${pageIndex}&size=${pageSize}`
    );
  }
}

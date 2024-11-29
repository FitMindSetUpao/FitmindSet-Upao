import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from '../../../environments/environment';
import { RecursoResponse} from '../../shared/models/recurso-response.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl = `${environment.baseURL}/recursos`;

  constructor(private http: HttpClient) {}

  getRecentRecursos(): Observable<RecursoResponse[]> {
    return this.http.get<RecursoResponse[]>(`${this.baseUrl}`);
  }

  getRecursoDetailsById(id: number): Observable<RecursoResponse> {
    return this.http.get<RecursoResponse>(`${this.baseUrl}/${id}`);
  }
}

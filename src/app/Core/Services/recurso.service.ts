import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recurso } from '../../Shared/Components/Models/recurso.model';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  private apiUrl = `${environment.apiUrl}/recursos`;

  constructor(private http: HttpClient) {}

  getRecursos(): Observable<Recurso[]> {
    return this.http.get<Recurso[]>(this.apiUrl);
  }
}

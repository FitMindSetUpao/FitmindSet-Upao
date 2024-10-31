import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meta } from '../../shared/models/meta.model';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private baseUrl = 'http://localhost:8080/api/v1/metas';

  constructor(private http: HttpClient) {}

  crearMeta(meta: Meta): Observable<Meta> {
    return this.http.post<Meta>(`${this.baseUrl}/crear`, meta);
  }
}

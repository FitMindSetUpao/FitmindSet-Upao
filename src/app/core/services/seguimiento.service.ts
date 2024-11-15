import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seguimiento } from '../../shared/models/Seguimiento.model';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {
  private baseUrl = 'http://localhost:8080/api/v1/seguimientos';

  constructor(private http: HttpClient) {}

  registrarSeguimiento(seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.http.post<Seguimiento>(`${this.baseUrl}/crear`, seguimiento);
  }
}

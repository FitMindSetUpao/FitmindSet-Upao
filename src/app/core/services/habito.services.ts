import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habito } from '../../shared/models/habito.model';
import { environment } from '../../../environments/environment';
import  { HabitoResponse} from '../../shared/models/habito-response.model';
import { PageableResponse } from '../../shared/models/pageable.response.model';
@Injectable({
  providedIn: 'root'
})
export class HabitoService {
  private baseUrl = `${environment.baseURL}/habitos`;
  private http = inject(HttpClient);

 getHabitosDetails(): Observable<HabitoResponse[]>{
  return this.http.get<HabitoResponse[]>(`${this.baseUrl}/reporte`);
 }
 paginateHabitos(page: number, size: number): Observable<PageableResponse<HabitoResponse>>{
  const params = new HttpParams().set('page', page.toString()).set('size',size.toString());
  return this.http.get<PageableResponse<HabitoResponse>>(`${this.baseUrl}/page`,
    { params });
  
 }
 createHabito(habito: Habito): Observable<HabitoResponse>{
  return this.http.post<HabitoResponse>(`${this.baseUrl}/crear`, habito);
 }
 getHabitosDetailsById(id: number):Observable<HabitoResponse> {
  return this.http.get<HabitoResponse>(`${this.baseUrl}/${id}`);
 }
 updateHabito(id: number, habito: Habito): Observable<HabitoResponse>{
  return this.http.put<HabitoResponse>(`${this.baseUrl}/${id}`, habito);
 }
 deleteHabito(id: number): Observable<void>{
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
 }
 
 
}

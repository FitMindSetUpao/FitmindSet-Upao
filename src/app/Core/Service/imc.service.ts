import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImcService {
  private apiUrl = '';
  constructor(private http: HttpClient) { }
  calcularIMC(peso: number, altura: number): Observable<number>{
    return this.http.post<number>(this.apiUrl, {peso, altura});
  }
}

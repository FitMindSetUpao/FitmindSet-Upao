import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PesoAlturaDTO } from '../../shared/models/peso-altura.model'; 

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = '/api/customer'; 

  constructor(private http: HttpClient) {}

  registrarPesoAltura(pesoAlturaDTO: PesoAlturaDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrarPesoAltura`, pesoAlturaDTO);
  }

  actualizarPesoAltura(pesoAlturaDTO: PesoAlturaDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizarPesoAltura`, pesoAlturaDTO);
  }
}

import {inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment} from '../../../environments/environment';
import { PurchaseResponse } from '../../shared/models/purchase-response.model';
import { PurchaseCreateUpdateRequest} from '../../shared/models/purchase-create-update-request.model';
import { PurchaseItemResponse} from '../../shared/models/purchase-response.model';
import {Purchase} from '../../shared/models/purchase.model';
//import { PurchaseReportResponse} from '../../shared/models/purchase-response.model'; DE DONDE SALIO???

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseURL = `${environment.baseURL}/purchases`;
  private http = inject(HttpClient);

  getAllPurchases(): Observable<PurchaseResponse[]> {
    return this.http.get<PurchaseResponse[]>(this.baseURL);
  }

  createPurchase(
    purchase: PurchaseCreateUpdateRequest
  ): Observable<PurchaseResponse> {
    return this.http.post<PurchaseResponse>(this.baseURL, purchase);
  }

  getPurchaseHistory(): Observable<PurchaseResponse[]> {
    return this.http.get<PurchaseResponse[]>(`${this.baseURL}/customer`);
  }

  /*  getPurchaseReport(): Observable<PurchaseReportResponse[]> {
    return this.http.get<PurchaseReportResponse[]>(`${this.baseURL}/reporte`);*/

  getPurchaseById(id: number): Observable<PurchaseResponse> {
    return this.http.get<PurchaseResponse>(`${this.baseURL}/${id}`);
  }

  confirmPurchase(id: number): Observable<PurchaseResponse> {
    return this.http.post<PurchaseResponse>(`${this.baseURL}/confirm/${id}`, {});
  }
}

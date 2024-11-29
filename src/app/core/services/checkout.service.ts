import { inject, Injectable} from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PaypalOrderResponse, PaypalCaptureResponse} from '../../shared/models/paypal-response.model';

@Injectable({
  providedIn: 'root'
  })
export class CheckoutService {
  private baseURL = `${environment.baseURL}/checkout`;
  private http = inject(HttpClient);

  createPaypalOrder(purchaseId: number) {
    let params = new HttpParams();
    params = params.append('purchaseId', purchaseId);
    params = params.append('returnUrl', environment.paypalReturnUrl);
    params = params.append('cancelUrl', environment.paypalReturnUrl);
    return this.http.post<PaypalOrderResponse>(`${this.baseURL}/crear`, null, {
      params: params,
    });
  }

  capturePaypalOrder(orderId: string, paymentProvider?: string) {
    const url = paymentProvider
      ? `${this.baseURL}/capture?orderId=${orderId}&paymentProvider=${paymentProvider}`
      : `${this.baseURL}/capture?orderId=${orderId}`;
    return this.http.post<PaypalCaptureResponse>(url, null);
  }
  
  
}

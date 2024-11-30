import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment} from '../../../environment';

@Injectable({
  providedIn: "root",
})
export class ResourceService {
  private apiUrl = environment.baseURL;

  constructor(private http: HttpClient) { }

  registrarRecurso(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-resource`, data);
  }
}

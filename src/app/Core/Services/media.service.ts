import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../Environments/environment";
import { UploadMediaResponse } from "../../Shared/Components/Models/upload-media-response.model";
@Injectable({
    providedIn: 'root',
})
export class MediaService {
  private baseUrl = `${environment.apiUrl}/media`;

  constructor(private http: HttpClient) {}

  upload(formData: FormData): Observable<UploadMediaResponse> {
    return this.http.post<UploadMediaResponse>(`${this.baseUrl}/upload`, formData);
  }

  getMedia(filename: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${filename}`, { responseType: 'blob' });
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}

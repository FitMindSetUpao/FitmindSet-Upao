import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { UploadMediaResponse } from "../../shared/models/upload-media-response.model";
@Injectable({
    providedIn: 'root',
})
export class MediaService {
    private baseUrl =`${environment.baseURL}/media`;
    private http = inject(HttpClient);

    constructor(){}
        upload(formData: FormData): Observable<UploadMediaResponse>{
            return this.http.post<UploadMediaResponse>(
                `${this.baseUrl}/upload`,
                formData
            );
    }

    getMedia(filename: string): Observable<Blob> {
        const url = `${this.baseUrl}/${filename}`;
        return this.http.get(url,{responseType: 'blob'});
    }
}
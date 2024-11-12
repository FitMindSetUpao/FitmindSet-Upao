import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../../Shared/Components/Models/usuario.model';
import { environment } from '../../Environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PerfilService {
    private apiUrl = `${environment.apiUrl}/perfil`;

    constructor(private http: HttpClient) {}

    getPerfil(): Observable<UsuarioDTO> {
        return this.http.get<UsuarioDTO>(`${this.apiUrl}`);
    }

    updatePerfil(usuario: UsuarioDTO): Observable<UsuarioDTO> {
        return this.http.put<UsuarioDTO>(`${this.apiUrl}`, usuario);
    }

    deactivatePerfil(): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/desactivar`, {});
    }
}

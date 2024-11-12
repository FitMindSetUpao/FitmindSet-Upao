import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    getUsuarioNombre(): string {
        return 'Nombre del Usuario';
    }
}

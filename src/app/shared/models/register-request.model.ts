export interface RegisterRequest {
    nombre: string;              
    apellidos: string;           
    correo: string;              
    contrasena: string;         
    edad?: number;               
    genero?: string;             
    especialidad?: string;       
    token?: string;              
}

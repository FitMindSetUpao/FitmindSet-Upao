export interface RegisterResponse {
    id: number;                        // Usamos number para Long en Java
    correo: string;                    // Correo del usuario
    role: string;                      // Asumiendo que ERole se convierte a string
    nombre: string;                    // Nombre del usuario
    apellidos: string;                 // Apellidos del usuario
    especialidad?: string;             // La especialidad es opcional
    verificationToken?: string;        // El token de verificación es opcional
    token?: string;                    // El token es opcional
}

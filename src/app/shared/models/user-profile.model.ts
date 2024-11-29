export interface UserProfile {
    id: number;
    correo: string;
    rol: 'CUSTOMER' | 'AUTHOR' | null;
    nombre: string;
    apellidos: string;
    especialidad?: string;
    fechaNacimiento?: string; // Formato: 'YYYY-MM-DD'
    telefono?: string;
    direccion?: string;
    estadoCuenta?: string; // Puede ser 'Activo', 'Suspendido', etc.
    ultimaActividad?: string; // Fecha y hora de la última actividad
    idiomaPreferido?: string;
    notificaciones?: boolean; // true si las notificaciones están habilitadas
    imagen?: string; // URL de la imagen de perfil
    historialActividades?: { descripcion: string }[]; // Lista de actividades pasadas
    verificado?: boolean; // true si la cuenta está verificada
    linkedin?: string;
    twitter?: string;
  }
  
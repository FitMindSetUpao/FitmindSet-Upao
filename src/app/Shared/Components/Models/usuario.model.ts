export interface UsuarioDTO {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaRegistro: string;
  imagen?: string; // La imagen es opcional
  activo: boolean;
}

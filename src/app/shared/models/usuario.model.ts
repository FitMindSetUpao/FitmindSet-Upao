export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: 'Autor' | 'Cliente' | 'Administrador';
  fechaRegistro: Date;
  perfilActivo: boolean;
}

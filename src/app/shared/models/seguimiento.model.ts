export interface Seguimiento {
  id: number;
  fecha: string;  // Formato ISO string
  porcentajeCumplido: number;
  tiempoInvertido: number;
  estado: string;  // Podría ser un enum si es necesario
  metaId: number;
  observaciones: string;
}

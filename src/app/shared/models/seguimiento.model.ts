export interface SeguimientoDTO {
  id: number;
  fecha: string; // Formato ISO string (YYYY-MM-DD)
  porcentajeCumplido: number;
  tiempoInvertido: number;
  estado: string; // Estado del seguimiento
  metaId: number; // ID de la meta asociada
  observaciones: string; // Notas adicionales
}

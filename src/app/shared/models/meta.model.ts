import { SeguimientoDTO } from "./seguimiento.model";  // Ajusta la ruta según sea necesario

export interface MetaDTO {
  id?: number;                // La propiedad id es opcional
  descripcion: string;
  estado: string;
  fechaInicio: string;        // Formato ISO string
  fechaFin: string;           // Formato ISO string
  tiempoObjetivo: number;
  habitoId: number;
  customerId?: number;       // La propiedad customerId es opcional
  seguimientos?: SeguimientoDTO[];  // Lista de seguimientos asociados a la meta
}

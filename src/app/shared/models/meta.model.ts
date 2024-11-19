import { SeguimientoDTO } from "./seguimiento.model";  // Ajusta la ruta según sea necesario

export interface MetaDTO {
  id?:number;
  descripcion: string;
  estado: string;
  fechaInicio: string; // Formato ISO string
  fechaFin: string;    // Formato ISO string
  tiempoObjetivo: number;
  habitoId: number;
  customerId?: number; 
  seguimientos?: SeguimientoDTO[]; 
  }
  
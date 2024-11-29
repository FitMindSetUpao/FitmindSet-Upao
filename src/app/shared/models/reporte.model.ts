import { SeguimientoDTO } from "./seguimiento.model";
export interface ReporteDTO {
  metaId: number;
  nombreMeta: string;
  totalSeguimientos: number;
  totalTiempoInvertido: number;
  porcentajeCumplido: number;
  // Aquí debes mantener los seguimientos dentro de un array si es necesario.
  seguimientos: SeguimientoDTO[]; 
}

export interface SeguimientoDTO {
    tiempoInvertido: number;
    porcentajeCumplido: number;
    fecha: string;
  }
  
  export interface ReporteDTO {
    metaId: number;
    nombreMeta: string;
    totalSeguimientos: number;
    totalTiempoInvertido: number;
    porcentajeCumplido: number;
    seguimientos: SeguimientoDTO[];
  }
  
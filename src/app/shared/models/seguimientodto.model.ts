export interface SeguimientoDTO {
    id: number;
    fecha: string;
    porcentajeCumplido: number;
    tiempoInvertido: number;
    estadoSeguimiento: string; // Nombre diferente
    meta: number; // Corresponde a metaId
    notas: string; // Corresponde a observaciones
  }
  
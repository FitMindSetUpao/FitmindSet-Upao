import { MetaDTO } from "./meta.model";
export interface MetaResponseDTO {
    id: number;
    descripcion: string;
    estado: string;
    fechaInicio: Date;  
    fechaFin: Date;   
    habitoId: number;
    tiempoObjetivo: number;
    metas: MetaDTO[];
  }

import { MetaDTO } from "./meta.model";
export interface Habito {
    id?: number;
    nombreHabito: string;
    descripcion: string;
    tipoDeHabitoId: number;
    metas: MetaDTO[]; 
    fechaCreacion: string; 
    
  }
  

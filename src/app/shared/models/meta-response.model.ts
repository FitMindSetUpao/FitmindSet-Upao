// meta-response.dto.ts
export interface MetaResponseDTO {
    id: number;
    descripcion: string;
    estado: string;
    fechaInicio: string;  // Formato ISO string
    fechaFin: string;     // Formato ISO string
    habitoId: number;
    tiempoObjetivo: number;
  }
  
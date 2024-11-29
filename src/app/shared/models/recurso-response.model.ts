export interface RecursoResponse {
  recursoid: number;
  nombreRecurso: string;
  descripcionRecurso: string;
  precioRecurso: number;
  tipoRecurso: string;
  autorNombre: string;
  coverPath: string;
  filePath: string;
  createdAt: string;
  updatedAt: string;
  tipoDeHabito: string;
  tipoDeHabitoId: number; // Agregado para coincidir con el backend
  planId: number;
}

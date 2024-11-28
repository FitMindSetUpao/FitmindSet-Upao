export interface Recurso {
  recursoid?:number;
  nombreRecurso:string;
  descripcionRecurso:string;
  precioRecurso:number;
  coverPath: string;
  filePath: string;
  tipoDeHabitoId: number;
  tipoDeRecurso:string;
  createdAt: string;
  updatedAt: string;
  planId: number;
}

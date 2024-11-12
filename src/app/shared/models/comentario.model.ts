export interface Comentario {
    id: number;
    contenido: string;
    fechaPublicacion: Date;
    grupoId: number;
    customerId: number;
    parentId?: number; // Opcional si es un comentario de respuesta
  }
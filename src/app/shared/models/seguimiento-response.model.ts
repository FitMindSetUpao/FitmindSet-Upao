export interface SeguimientoResponse {
    id?: number;      // El ID único del seguimiento
    metaId: number;             // ID de la meta asociada
    tiempoInvertido: number;    // Tiempo invertido en el seguimiento
    observaciones: string;      // Observaciones del seguimiento
    estado: string;             // Estado del seguimiento (por ejemplo, 'En progreso', 'Completado', etc.)
    porcentajeCumplido: number; // Porcentaje de la meta cumplida (opcional, dependiendo de tu lógica de negocio)
    fecha: string;              // Fecha de creación o última actualización del seguimiento
  }
  

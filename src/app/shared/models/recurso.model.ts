export interface Recurso {
  id: string;
  name: string;
  publicationDate: Date;
  status: 'Activo' | 'En revisión' | 'Archivado';
  metrics: Metrics;
}

export interface Metrics {
  views: number;
  interactions: number;
  shares: number;
}

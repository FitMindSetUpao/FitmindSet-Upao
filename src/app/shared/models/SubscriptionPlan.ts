export interface SubscriptionPlan {
  id: string;            // Identificador único del plan
  name: string;          // Nombre del plan (Mensual, Anual)
  description: string;   // Descripción breve del plan
  price: number;         // Precio del plan
}

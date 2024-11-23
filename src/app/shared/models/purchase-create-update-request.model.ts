export interface PurchaseCreateUpdateRequest {
  total: number;
  customerId: number;
  items: PurchaseItemCreateUpdateRequest[];
}

export interface PurchaseItemCreateUpdateRequest {
  recursoId: number;
  //nombreRecurso: string; no se si incluirlo, preguntar al chato//
  quantity: number;
  price: number;
}

export interface PurchaseCreateUpdateRequest {
  total: number;
  customerId: number;
  items: PurchaseItemCreateUpdateRequest[];
}

export interface PurchaseItemCreateUpdateRequest {
  recursoId: number;
  nombreRecurso: string;
  quantity: number;
  price: number;
}

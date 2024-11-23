export interface PurchaseCreateUpdateRequest {
  total: number;
  customerId: number;
  items: PurchaseItemCreateUpdateRequest[];
}

export interface PurchaseItemCreateUpdateRequest {
  recursoId: number;
  quantity: number;
  price: number;
}

export interface PurchaseResponse {
  id: number;
  total: number;
  createdAt: string;
  paymentStatus: PaymentStatus;
  customerName: string;
  items: PurchaseItemResponse[];
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

export interface PurchaseItemResponse {
  id: number;
  nombreRecurso: string;
  precio: number;
  cantidad: number;
}

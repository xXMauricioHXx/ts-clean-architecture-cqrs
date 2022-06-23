export namespace PaymentRepository {
  export type Model = {
    id: string;
    payerId: number;
    receiverId: number;
    value: number;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
  };

  export type CreateParams = {
    id: string;
    payerId: number;
    receiverId: number;
    value: number;
    description?: string;
  };
}

export interface PaymentRepository {
  getValueInDate(payerId: number, payedDate: Date): Promise<number>;
  createPayment(
    payment: PaymentRepository.CreateParams
  ): Promise<PaymentRepository.Model>;
  listPayments(): Promise<PaymentRepository.Model[]>;
}

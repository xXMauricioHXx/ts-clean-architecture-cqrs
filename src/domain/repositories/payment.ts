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
  findByPayerIdAndDate(
    payerId: number,
    date: Date
  ): Promise<PaymentRepository.Model[]>;
  create(
    data: PaymentRepository.CreateParams
  ): Promise<PaymentRepository.Model>;
  findAll(): Promise<PaymentRepository.Model[]>;
}

import { PaymentRepository } from '@/domain/repositories';

export namespace PaymentService {
  export type CreateParams = {
    id: string;
    payerId: number;
    receiverId: number;
    value: number;
    description?: string;
  };

  export type CreateResult = PaymentRepository.Model;

  export type ListResult = PaymentRepository.Model[];
}

export interface PaymentService {
  getValueInDate(payerId: number, payedDate: Date): Promise<number>;
  createPayment(
    payment: PaymentService.CreateParams
  ): Promise<PaymentService.CreateResult>;
  listPayments(): Promise<PaymentService.ListResult>;
}

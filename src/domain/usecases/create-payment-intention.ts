import { PaymentRepository } from '@/domain/repositories';

export namespace CreatePaymentIntention {
  export type Params = {
    id: string;
    payerId: number;
    receiverId: number;
    value: number;
    description?: string;
  };

  export type Result = PaymentRepository.Model;
}

export interface CreatePaymentIntention {
  create(
    data: CreatePaymentIntention.Params
  ): Promise<CreatePaymentIntention.Result>;
}

import { PaymentRepository } from '@/core/ports';

export namespace CreatePaymentIntention {
  export type Params = {
    id: string;
    payerId: string;
    receiverId: string;
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

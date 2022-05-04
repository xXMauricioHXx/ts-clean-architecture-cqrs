import { PaymentRepository } from '@/core/ports';

export namespace ListPaymentsIntention {
  export type Result = PaymentRepository.Model[];
}

export interface ListPaymentsIntention {
  list(): Promise<ListPaymentsIntention.Result>;
}

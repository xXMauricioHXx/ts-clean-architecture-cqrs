import { PaymentService } from '@/domain/services';

export namespace ListPaymentsIntention {
  export type Result = PaymentService.ListResult;
}

export interface ListPaymentsIntention {
  list(): Promise<ListPaymentsIntention.Result>;
}

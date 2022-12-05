import { PaymentRepository } from '@/core/domain/repositories';

export namespace ListPaymentsQueryHandler {
  export type Result = PaymentRepository.Model[];
}

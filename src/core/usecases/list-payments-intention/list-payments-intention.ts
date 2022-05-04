import { inject, injectable } from 'tsyringe';
import { PaymentRepository } from '@/core/ports';
import { ListPaymentsIntention } from '@/core/usecases';

@injectable()
export class ListPaymentintentionUseCase implements ListPaymentsIntention {
  constructor(
    @inject('PaymentRepository')
    private readonly paymentRepository: PaymentRepository
  ) {}

  async list(): Promise<ListPaymentsIntention.Result> {
    return this.paymentRepository.listPayments();
  }
}

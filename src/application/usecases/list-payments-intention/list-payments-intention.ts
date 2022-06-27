import { inject, injectable } from 'tsyringe';
import { PaymentService } from '@/domain/services';
import { ListPaymentsIntention } from '@/domain/usecases';

@injectable()
export class ListPaymentintentionUseCase implements ListPaymentsIntention {
  constructor(
    @inject('PaymentService')
    private readonly paymentService: PaymentService
  ) {}

  async list(): Promise<ListPaymentsIntention.Result> {
    return this.paymentService.listPayments();
  }
}

import { inject, injectable } from 'tsyringe';
import { PaymentRepository } from '@/domain/repositories';
import { PaymentService } from '@/domain/services';

@injectable()
export class PaymentServiceProvider implements PaymentService {
  constructor(
    @inject('PaymentRepository')
    private readonly paymentRepository: PaymentRepository
  ) {}

  async getValueInDate(payerId: number, date: Date): Promise<number> {
    const payments = await this.paymentRepository.findByPayerIdAndDate(
      payerId,
      date
    );

    return payments.reduce((acc, payment) => (acc += payment.value), 0);
  }

  createPayment(
    data: PaymentService.CreateParams
  ): Promise<PaymentRepository.Model> {
    return this.paymentRepository.create(data);
  }

  listPayments(): Promise<PaymentService.ListResult> {
    return this.paymentRepository.findAll();
  }
}

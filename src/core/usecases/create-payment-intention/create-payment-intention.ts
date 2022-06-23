import { inject, injectable } from 'tsyringe';
import { Payment } from '@/core/entities';
import { PaymentRepository, UserService } from '@/core/ports';
import { CreatePaymentIntention } from '@/core/usecases';
import { dateNow } from '@/shared/helpers';

@injectable()
export class CreatePaymentIntentionUseCase implements CreatePaymentIntention {
  constructor(
    @inject('PaymentRepository')
    private readonly paymentRepository: PaymentRepository,
    @inject('UserService') private readonly userService: UserService
  ) {}

  async create(
    data: CreatePaymentIntention.Params
  ): Promise<CreatePaymentIntention.Result> {
    const { receiverId, value, description, payerId, id } = data;
    const payedDate = dateNow();

    await this.checkPayerAndReceiverExists(payerId, receiverId);

    const valueInDate = await this.paymentRepository.getValueInDate(
      payerId,
      payedDate
    );

    const payment = new Payment({
      id,
      receiverId,
      payerId,
      value,
      description,
      valueInDate,
      payedDate,
    });

    const createdPayment = await this.paymentRepository.createPayment({
      payerId,
      receiverId,
      description: payment.description,
      id: payment.id,
      value: payment.value,
    });

    return {
      id,
      payerId,
      receiverId,
      description,
      value,
      createdAt: createdPayment.createdAt,
      updatedAt: createdPayment.updatedAt,
    };
  }

  private async checkPayerAndReceiverExists(
    payerId: number,
    receiverId: number
  ): Promise<void> {
    await Promise.all([
      this.userService.checkUserExists(payerId),
      this.userService.checkUserExists(receiverId),
    ]);
  }
}

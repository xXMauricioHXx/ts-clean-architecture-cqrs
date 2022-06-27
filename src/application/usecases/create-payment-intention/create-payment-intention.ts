import { inject, injectable } from 'tsyringe';
import { dateNow } from '@/shared/helpers';
import { Payment } from '@/domain/entities';
import { PaymentService, UserService } from '@/domain/services';
import { CreatePaymentIntention } from '@/domain/usecases';

@injectable()
export class CreatePaymentIntentionUseCase implements CreatePaymentIntention {
  constructor(
    @inject('PaymentService')
    private readonly paymentService: PaymentService,
    @inject('UserService') private readonly userService: UserService
  ) {}

  async create(
    data: CreatePaymentIntention.Params
  ): Promise<CreatePaymentIntention.Result> {
    const { receiverId, value, description, payerId, id } = data;
    const payedDate = dateNow();

    await this.checkPayerAndReceiverExists(payerId, receiverId);

    const valueInDate = await this.paymentService.getValueInDate(
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

    const createdPayment = await this.paymentService.createPayment({
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

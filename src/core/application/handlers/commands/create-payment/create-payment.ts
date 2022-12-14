import { inject, injectable } from 'tsyringe';
import { dateNow } from '@/shared/helpers';
import { Payment } from '@/core/domain/entities';
import { Bus } from '@/core/domain/commands/bus';
import { Handler } from '@/core/application/ports/handler';
import { PaymentCreatedEvent } from '@/core/application/events';
import { CreatePaymentCommand } from '@/core/application/commands';
import { PaymentService, UserService } from '@/core/domain/services';

@injectable()
export class CreatePaymentHandler implements Handler<CreatePaymentCommand> {
  constructor(
    @inject('PaymentService')
    private readonly paymentService: PaymentService,
    @inject('UserService') private readonly userService: UserService,
    @inject('Bus') private readonly bus: Bus
  ) {}

  async execute(command: CreatePaymentCommand): Promise<void> {
    const { receiverId, value, description, payerId, id } = command.data;
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

    await this.paymentService.createPayment({
      payerId,
      receiverId,
      description: payment.description,
      id: payment.id,
      value: payment.value,
    });

    this.bus.dispatchEvent(new PaymentCreatedEvent(command.data));
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

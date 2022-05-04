import { inject, injectable } from 'tsyringe';
import { Payment } from '@/core/entities';
import {
  MaxLimitReachedError,
  OutSideOfWindowValueError,
} from '@/core/exceptions';
import { PaymentRepository } from '@/core/ports';
import { CreatePaymentIntention } from '@/core/usecases';

@injectable()
export class CreatePaymentIntentionUseCase implements CreatePaymentIntention {
  constructor(
    @inject('PaymentRepository')
    private readonly paymentRepository: PaymentRepository
  ) {}

  async create(
    data: CreatePaymentIntention.Params
  ): Promise<CreatePaymentIntention.Result> {
    const { receiverId, value, description, payerId, id } = data;
    const payedDate = new Date(Date.now());

    const valueInDate = await this.paymentRepository.getValueInDate(
      payerId,
      payedDate
    );

    const payment = new Payment({
      id,
      receiverId,
      value,
      description,
      valueInDate,
      payedDate,
    });

    if (payment.isReachedLimit()) {
      throw new MaxLimitReachedError();
    }

    if (payment.isOutSideFromWindowValue()) {
      throw new OutSideOfWindowValueError();
    }

    const createdPayment = await this.paymentRepository.createPayment({
      id,
      payerId,
      receiverId,
      value,
      description,
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
}

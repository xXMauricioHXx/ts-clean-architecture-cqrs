import { CreatePaymentIntention } from '@/domain/usecases';
import { CreatePaymentIntentionConsumer } from '@/presentation/amqp/consumers';

export class CreatePaymentIntentionPresenter {
  static toUseCase(
    data: CreatePaymentIntentionConsumer.Request
  ): CreatePaymentIntention.Params {
    return {
      id: data.id,
      payerId: data.payer_id,
      receiverId: data.receiver_id,
      value: data.value,
      description: data.description,
    };
  }
}

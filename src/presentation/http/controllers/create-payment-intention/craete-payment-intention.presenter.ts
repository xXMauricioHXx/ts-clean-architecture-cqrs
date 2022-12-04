import { CreatePaymentIntentionController } from '@/presentation/http/controllers';
import { CreatePayment } from '@/core/domain/commands/create-payment';
export class CreatePaymentIntentionPresenter {
  static toCommand(
    data: CreatePaymentIntentionController.Request
  ): CreatePayment.Params {
    return {
      id: data.id,
      payerId: data.payer_id,
      receiverId: data.receiver_id,
      value: data.value,
      description: data.description,
    };
  }
}

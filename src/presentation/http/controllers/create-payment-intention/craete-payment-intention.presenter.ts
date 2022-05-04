import { CreatePaymentIntention } from '@/core/usecases';
import { CreatePaymentIntentionController } from '@/presentation/http/controllers';

export class CreatePaymentIntentionPresenter {
  static toJSON(
    data: CreatePaymentIntention.Result
  ): CreatePaymentIntentionController.Response {
    return {
      id: data.id,
      payer_id: data.payerId,
      receiver_id: data.receiverId,
      value: data.value,
      description: data.description,
      created_at: data.createdAt.toISOString(),
      updated_at: data.updatedAt.toISOString(),
    };
  }

  static toUseCase(
    data: CreatePaymentIntentionController.Request
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

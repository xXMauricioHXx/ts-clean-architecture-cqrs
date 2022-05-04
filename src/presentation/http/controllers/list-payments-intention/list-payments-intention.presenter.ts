import { ListPaymentsIntention } from '@/core/usecases';
import { ListPaymentsIntentionController } from '@/presentation/http/controllers';

export class ListPaymentsIntentionPresenter {
  static toJSON(
    data: ListPaymentsIntention.Result
  ): ListPaymentsIntentionController.Response[] {
    return data.map(item => {
      return {
        id: item.id,
        payer_id: item.payerId,
        receiver_id: item.receiverId,
        value: item.value,
        description: item.description,
        created_at: item.createdAt.toISOString(),
        updated_at: item.updatedAt.toISOString(),
      };
    });
  }
}

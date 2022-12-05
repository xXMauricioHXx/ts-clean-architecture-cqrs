import { ListPaymentsQueryHandler } from '@/core/domain/queries';
import { ListPaymentsController } from '@/presentation/http/controllers';

export class ListPaymentsPresenter {
  static toJSON(
    data: ListPaymentsQueryHandler.Result
  ): ListPaymentsController.Response {
    return data.map(result => ({
      id: result.id,
      payer_id: result.payerId,
      receiver_id: result.receiverId,
      value: result.value,
      description: result.description,
      updated_at: result.updatedAt.toDateString(),
      created_at: result.createdAt.toDateString(),
    }));
  }
}

import { inject, injectable } from 'tsyringe';
import { Controller, HttpResponse } from '@/presentation/http/ports';
import { get } from '@/shared/decorators';
import { ListPaymentsIntentionPresenter } from '@/presentation/http/controllers';
import { ListPaymentsIntention } from '@/domain/usecases';

@injectable()
@get('/payments')
export class ListPaymentsIntentionController extends Controller {
  constructor(
    @inject('ListPaymentsIntention')
    private readonly listPaymentsIntentionUseCase: ListPaymentsIntention
  ) {
    super();
  }

  async handle(): Promise<
    HttpResponse<ListPaymentsIntentionController.Response[]>
  > {
    const payments = await this.listPaymentsIntentionUseCase.list();
    ListPaymentsIntentionPresenter;
    return {
      data: ListPaymentsIntentionPresenter.toJSON(payments),
    };
  }

  exception(error: Error): Error {
    return error;
  }
}

export namespace ListPaymentsIntentionController {
  export type Response = {
    id: string;
    payer_id: number;
    receiver_id: number;
    description?: string;
    value: number;
    created_at: string;
    updated_at: string;
  };
}

import { inject, injectable } from 'tsyringe';
import { get } from '@/shared/decorators';
import { Bus } from '@/core/domain/commands/bus';
import { ListPaymentsQueryHandler } from '@/core/domain/queries';
import { ListPaymentsPresenter } from '@/presentation/http/controllers';
import { ListPaymentsQuery } from '@/core/application/queries/list-payments';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/http/ports';

@injectable()
@get('/payments')
export class ListPaymentsController extends Controller {
  constructor(@inject('Bus') private readonly bus: Bus) {
    super();
  }

  async handle(
    req: HttpRequest
  ): Promise<HttpResponse<ListPaymentsController.Response>> {
    const result =
      await this.bus.dispatchQuery<ListPaymentsQueryHandler.Result>(
        new ListPaymentsQuery()
      );

    return {
      data: ListPaymentsPresenter.toJSON(result),
    };
  }

  exception(error: Error): Error {
    return error;
  }
}

export namespace ListPaymentsController {
  export type Payment = {
    id: string;
    payer_id: number;
    receiver_id: number;
    value: number;
    description?: string;
    created_at: string;
    updated_at: string;
  };
  export type Response = Payment[];
}

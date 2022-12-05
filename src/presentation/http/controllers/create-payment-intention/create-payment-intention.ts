import { inject, injectable } from 'tsyringe';
import { httpStatus, post, schema } from '@/shared/decorators';
import { Bus } from '@/core/domain/commands/bus';
import { CreatePaymentCommand } from '@/core/application/commands';
import { Controller, HttpRequest } from '@/presentation/http/ports';
import { BadRequest, NotFoundError } from '@/presentation/http/exceptions';
import {
  CreatePaymentIntentionPresenter,
  createPaymentIntentionSchema,
} from '@/presentation/http/controllers';
import { CodedError } from '@/shared/coded-error';
import {
  MaxLimitReachedError,
  OutSideOfWindowValueError,
  SameOriginError,
  UserNotFoundError,
} from '@/core/domain/exceptions';

@injectable()
@post('/payments')
export class CreatePaymentIntentionController extends Controller {
  constructor(@inject('Bus') private readonly bus: Bus) {
    super();
  }

  @httpStatus(201)
  @schema(createPaymentIntentionSchema)
  async handle(req: HttpRequest): Promise<void> {
    const data = req.body as CreatePaymentIntentionController.Request;

    const command = new CreatePaymentCommand(
      CreatePaymentIntentionPresenter.toCommand(data)
    );

    await this.bus.syncDispatchCommand(command);
  }

  exception(error: Error): Error {
    if (error instanceof CodedError) {
      const { code, message } = error;

      if (
        error instanceof OutSideOfWindowValueError ||
        error instanceof MaxLimitReachedError ||
        error instanceof SameOriginError
      ) {
        return new BadRequest(code, message);
      }

      if (error instanceof UserNotFoundError) {
        return new NotFoundError(code, message);
      }
    }

    return error;
  }
}

export namespace CreatePaymentIntentionController {
  export type Request = {
    id: string;
    payer_id: number;
    receiver_id: number;
    description?: string;
    value: number;
  };
}

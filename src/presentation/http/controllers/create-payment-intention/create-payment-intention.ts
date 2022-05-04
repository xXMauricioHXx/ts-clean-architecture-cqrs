import { inject, injectable } from 'tsyringe';
import { CreatePaymentIntention } from '@/core/usecases';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/http/ports';
import { httpStatus, post, schema } from '@/shared/decorators';
import {
  CreatePaymentIntentionPresenter,
  createPaymentIntentionSchema,
} from '@/presentation/http/controllers';
import { CodedError } from '@/shared/coded-error';
import {
  MaxLimitReachedError,
  OutSideOfWindowValueError,
} from '@/core/exceptions';
import { BadRequest } from '@/presentation/http/controllers/exceptions';

@injectable()
@post('/payments')
export class CreatePaymentIntentionController extends Controller {
  constructor(
    @inject('CreatePaymentIntention')
    private readonly createPaymentIntentionUseCase: CreatePaymentIntention
  ) {
    super();
  }

  @httpStatus(201)
  @schema(createPaymentIntentionSchema)
  async handle(
    req: HttpRequest
  ): Promise<HttpResponse<CreatePaymentIntentionController.Response>> {
    const data = req.body as CreatePaymentIntentionController.Request;

    const createdPayment = await this.createPaymentIntentionUseCase.create(
      CreatePaymentIntentionPresenter.toUseCase(data)
    );

    return {
      data: CreatePaymentIntentionPresenter.toJSON(createdPayment),
    };
  }

  exception(error: Error): Error {
    if (error instanceof CodedError) {
      const { code, message } = error;

      if (
        error instanceof OutSideOfWindowValueError ||
        error instanceof MaxLimitReachedError
      ) {
        return new BadRequest(code, message);
      }
    }

    return error;
  }
}

export namespace CreatePaymentIntentionController {
  export type Response = {
    id: string;
    payer_id: string;
    receiver_id: string;
    description?: string;
    value: number;
    created_at: string;
    updated_at: string;
  };

  export type Request = {
    id: string;
    payer_id: string;
    receiver_id: string;
    description?: string;
    value: number;
  };
}

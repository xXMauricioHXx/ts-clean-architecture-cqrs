import { inject, injectable } from 'tsyringe';
import {
  AmqpRequest,
  Consumer,
  ConsumerErrorOptions,
} from '@/presentation/amqp/ports';
import {
  CreatePaymentIntentionPresenter,
  createPaymentIntentionSchema,
} from '@/presentation/amqp/consumers';
import logger from '@/logger';
import { queue, schema } from '@/shared/decorators';
import { CreatePaymentIntention } from '@/core/usecases';
import { ValidationError } from '@/shared/validation-error';

@injectable()
@queue('create-payment-intention')
export class CreatePaymentIntentionConsumer extends Consumer {
  constructor(
    @inject('CreatePaymentIntention')
    private readonly createPaymentIntentionUseCase: CreatePaymentIntention
  ) {
    super();
  }

  @schema(createPaymentIntentionSchema)
  async handle(req: AmqpRequest): Promise<void> {
    const data = req.body as CreatePaymentIntentionConsumer.Request;

    await this.createPaymentIntentionUseCase.create(
      CreatePaymentIntentionPresenter.toUseCase(data)
    );
  }

  exception(error: Error): ConsumerErrorOptions {
    if (error instanceof ValidationError) {
      logger.error(
        `Failed to validate create payment intention message: ${
          error.message
        } - ${JSON.stringify(error.details)}`
      );
    }

    return {
      shouldAck: true,
    };
  }
}

export namespace CreatePaymentIntentionConsumer {
  export type Request = {
    id: string;
    payer_id: number;
    receiver_id: number;
    description?: string;
    value: number;
  };
}

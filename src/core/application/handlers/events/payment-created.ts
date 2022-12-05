import logger from '@/logger';
import { EventHandle } from '@/core/application/ports';
import { PaymentCreatedEvent } from '@/core/application/events';

export class PaymentCreatedEventHandle
  implements EventHandle<PaymentCreatedEvent>
{
  execute(event: PaymentCreatedEvent): void {
    const { data } = event;

    // send email
    logger.info(`Sending email to payerId #${data.payerId}`);
  }
}

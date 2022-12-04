import { event } from '@/shared/decorators';
import { Event } from '@/core/application/ports/event';
import { CreatePayment } from '@/core/domain/commands/create-payment';

@event()
export class PaymentCreatedEvent extends Event {
  constructor(public data: CreatePayment.Params) {
    super();
  }
}

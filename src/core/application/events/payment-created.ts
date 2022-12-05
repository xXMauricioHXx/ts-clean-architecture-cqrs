import { event } from '@/shared/decorators';
import { Event } from '@/core/application/ports';
import { CreatePayment } from '@/core/domain/commands';

@event()
export class PaymentCreatedEvent extends Event {
  constructor(public data: CreatePayment.Params) {
    super();
  }
}

import { command } from '@/shared/decorators';
import { Command } from '@/core/application/ports';
import { CreatePayment } from '@/core/domain/commands';

@command()
export class CreatePaymentCommand extends Command {
  constructor(public data: CreatePayment.Params) {
    super();
  }
}

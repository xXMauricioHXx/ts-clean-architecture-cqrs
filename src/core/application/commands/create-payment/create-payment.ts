import { command } from '@/shared/decorators';
import { Command } from '@/core/application/ports/command';
import { CreatePayment } from '@/core/domain/commands/create-payment';

@command()
export class CreatePaymentCommand extends Command {
  constructor(public data: CreatePayment.Params) {
    super();
  }
}

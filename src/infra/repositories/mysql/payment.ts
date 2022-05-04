import { Knex } from 'knex';
import { inject } from 'tsyringe';
import { Repository } from '@/infra/repositories/mysql';
import { PaymentRepository } from '@/core/ports';
import { table } from '@/shared/decorators';

@table('payments')
export class PaymentMySQLRepository
  extends Repository<PaymentRepository.Model>
  implements PaymentRepository
{
  constructor(@inject('dbConnection') protected database: Knex) {
    super();
  }

  getValueInDate(payerId: string, payedDate: Date): Promise<number> {
    this.transactionable().where('payerId', payerId);
  }

  createPayment(
    payment: PaymentRepository.CreateParams
  ): Promise<PaymentRepository.Model>;
  listPayments(): Promise<PaymentRepository.Model[]>;
}

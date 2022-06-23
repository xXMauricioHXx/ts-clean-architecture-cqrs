import { Knex } from 'knex';
import { inject, injectable } from 'tsyringe';
import { Repository } from '@/infra/repositories/mysql';
import { PaymentRepository } from '@/core/ports';
import { table } from '@/shared/decorators';
import { isoToMysqlDatetime } from '@/shared/helpers';

@table('payments')
@injectable()
export class PaymentMySQLRepository
  extends Repository<PaymentRepository.Model>
  implements PaymentRepository
{
  constructor(@inject('dbConnection') protected database: Knex) {
    super();
  }

  async getValueInDate(payerId: number, payedDate: Date): Promise<number> {
    const dateFilter = isoToMysqlDatetime(payedDate.toISOString());

    const { total } = await this.transactionable()
      .sum('value as total')
      .where('payerId', payerId)
      .andWhere('createdAt', dateFilter)
      .first();

    return total || 0;
  }

  async createPayment(
    payment: PaymentRepository.CreateParams
  ): Promise<PaymentRepository.Model> {
    await this.create(payment);
    const createdPayment = await this.getById(payment.id);

    return createdPayment!;
  }

  listPayments(): Promise<PaymentRepository.Model[]> {
    return this.all();
  }
}

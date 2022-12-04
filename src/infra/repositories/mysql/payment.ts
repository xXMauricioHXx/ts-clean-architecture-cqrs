import { Knex } from 'knex';
import { table } from '@/shared/decorators';
import { inject, injectable } from 'tsyringe';
import { PaymentRepository } from '@/core/domain/repositories';
import { Repository } from '@/infra/repositories/mysql';
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

  async findByPayerIdAndDate(
    payerId: number,
    date: Date
  ): Promise<PaymentRepository.Model[]> {
    const dateFilter = isoToMysqlDatetime(date.toISOString());

    return this.transactionable()
      .where('payerId', payerId)
      .andWhere('createdAt', dateFilter);
  }

  async create(
    data: PaymentRepository.CreateParams
  ): Promise<PaymentRepository.Model> {
    await this.transactionable().insert(data);
    const createdPayment = await this.findById(data.id);

    return createdPayment!;
  }

  findAll(): Promise<PaymentRepository.Model[]> {
    return this.findAll();
  }
}

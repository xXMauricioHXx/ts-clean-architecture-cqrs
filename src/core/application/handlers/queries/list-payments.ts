import { inject, injectable } from 'tsyringe';
import { QueryHandle } from '@/core/application/ports/query';
import { PaymentRepository } from '@/core/domain/repositories';
import { ListPaymentsQuery } from '@/core/application/queries/list-payments';
import { ListPaymentsQueryHandler } from '@/core/domain/queries/list-payments';

@injectable()
export class ListPaymentsQueryHandle implements QueryHandle<ListPaymentsQuery> {
  constructor(
    @inject('PaymentRepository')
    private readonly paymentRepository: PaymentRepository
  ) {}

  async execute(
    query: ListPaymentsQuery
  ): Promise<ListPaymentsQueryHandler.Result> {
    return this.paymentRepository.findAll();
  }
}

import { injectable } from 'tsyringe';
import { PaymentRepository } from '@/core/domain/repositories';

@injectable()
export class PaymentInMemoryRepository implements PaymentRepository {
  private payments: PaymentRepository.Model[] = [
    {
      id: '314b9d2e-e68d-4bba-84fc-e124490feb85',
      payerId: 1,
      receiverId: 2,
      value: 100,
      description: 'Teste',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findByPayerIdAndDate(
    payerId: number,
    date: Date
  ): Promise<PaymentRepository.Model[]> {
    return Promise.resolve(
      this.payments.filter(payment => payment.payerId === payerId)
    );
  }

  create(
    data: PaymentRepository.CreateParams
  ): Promise<PaymentRepository.Model> {
    const payment = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as PaymentRepository.Model;

    this.payments.push(payment);
    return Promise.resolve(payment);
  }

  findAll(): Promise<PaymentRepository.Model[]> {
    return Promise.resolve(this.payments);
  }
}

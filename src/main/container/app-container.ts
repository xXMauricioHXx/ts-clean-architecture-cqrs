import { KnexConnection, TSyringeContainer } from '@/adapters';
import {
  CreatePaymentIntentionUseCase,
  ListPaymentintentionUseCase,
} from '@/core/usecases';
import { PaymentInMemoryRepository } from '@/infra/repositories/in-memory';

export class AppContainer extends TSyringeContainer {
  loadProviders(): Record<string, any> {
    return {
      PaymentRepository: PaymentInMemoryRepository,
      CreatePaymentIntention: CreatePaymentIntentionUseCase,
      ListPaymentsIntention: ListPaymentintentionUseCase,
    };
  }

  loadConfigs(): Record<string, any> {
    return {
      dbConnection: new KnexConnection().getConnection(),
    };
  }
}

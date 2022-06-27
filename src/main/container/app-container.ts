import { AxiosClient, KnexConnection, TSyringeContainer } from '@/adapters';
import {
  CreatePaymentIntentionUseCase,
  ListPaymentintentionUseCase,
} from '@/application/usecases';
import { JsonPlaceHolderHttpIntegration } from '@/infra/integrations/http';
import { PaymentMySQLRepository } from '@/infra/repositories/mysql';
import { UserServiceProvider, PaymentServiceProvider } from '@/infra/services';

export class AppContainer extends TSyringeContainer {
  loadProviders(): Record<string, any> {
    return {
      HttpClient: AxiosClient,
      PaymentRepository: PaymentMySQLRepository,
      JsonPlaceHolderIntegration: JsonPlaceHolderHttpIntegration,
      UserService: UserServiceProvider,
      PaymentService: PaymentServiceProvider,
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

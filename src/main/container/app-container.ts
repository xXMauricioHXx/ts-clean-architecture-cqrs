import { AxiosClient, KnexConnection, TSyringeContainer } from '@/adapters';
import {
  CreatePaymentIntentionUseCase,
  ListPaymentintentionUseCase,
} from '@/core/usecases';
import { JsonPlaceHolderHttpIntegration } from '@/infra/integrations/http';
import { PaymentMySQLRepository } from '@/infra/repositories/mysql';
import { UserServiceProvider } from '@/infra/services';

export class AppContainer extends TSyringeContainer {
  loadProviders(): Record<string, any> {
    return {
      HttpClient: AxiosClient,
      JsonPlaceHolderIntegration: JsonPlaceHolderHttpIntegration,
      UserService: UserServiceProvider,
      PaymentRepository: PaymentMySQLRepository,
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

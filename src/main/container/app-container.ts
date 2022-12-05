import { CRQSBus } from '@/adapters';
import { PaymentMySQLRepository } from '@/infra/repositories/mysql';
import { JsonPlaceHolderHttpIntegration } from '@/infra/integrations/http';
import { AxiosClient, KnexConnection, TSyringeContainer } from '@/adapters';
import { CreatePaymentHandler } from '@/core/application/handlers/commands';
import { PaymentCreatedEventHandle } from '@/core/application/handlers/events';
import { PaymentServiceProvider, UserServiceProvider } from '@/infra/services';
import { ListPaymentsQueryHandle } from '@/core/application/handlers/queries/list-payments';

export class AppContainer extends TSyringeContainer {
  loadProviders(): Record<string, any> {
    return {
      HttpClient: AxiosClient,
      PaymentRepository: PaymentMySQLRepository,
      JsonPlaceHolderIntegration: JsonPlaceHolderHttpIntegration,
      PaymentService: PaymentServiceProvider,
      UserService: UserServiceProvider,
      /* Commands */
      CreatePaymentCommand: CreatePaymentHandler,
      /* Events */
      PaymentCreatedEvent: PaymentCreatedEventHandle,
      /* Queries */
      ListPaymentsQuery: ListPaymentsQueryHandle,
    };
  }

  loadConfigs(): Record<string, any> {
    return {
      dbConnection: new KnexConnection().getConnection(),
      Bus: new CRQSBus(),
    };
  }
}

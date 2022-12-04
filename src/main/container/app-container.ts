import { Bus } from '@/adapters/command-bus/command-bus';
import { PaymentMySQLRepository } from '@/infra/repositories/mysql';
import { JsonPlaceHolderHttpIntegration } from '@/infra/integrations/http';
import { AxiosClient, KnexConnection, TSyringeContainer } from '@/adapters';
import { CreatePaymentHandler } from '@/core/application/handlers/commands';
import { PaymentCreatedEventHandle } from '@/core/application/handlers/events';
import { PaymentServiceProvider, UserServiceProvider } from '@/infra/services';

export class AppContainer extends TSyringeContainer {
  loadProviders(): Record<string, any> {
    return {
      HttpClient: AxiosClient,
      PaymentRepository: PaymentMySQLRepository,
      JsonPlaceHolderIntegration: JsonPlaceHolderHttpIntegration,
      PaymentService: PaymentServiceProvider,
      UserService: UserServiceProvider,
    };
  }

  loadConfigs(): Record<string, any> {
    return {
      dbConnection: new KnexConnection().getConnection(),
      CommandBus: new Bus({
        commandHandleMap: {
          CreatePaymentCommand: CreatePaymentHandler,
        },
        eventHandleMap: {
          PaymentCreatedEvent: PaymentCreatedEventHandle,
        },
      }),
    };
  }
}

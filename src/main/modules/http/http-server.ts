import { ExpressServer } from '@/adapters';
import { Module } from '@/main/modules/module';
import {
  CreatePaymentIntentionController,
  ListPaymentsIntentionController,
} from '@/presentation/http/controllers';

export class HttpServer extends ExpressServer implements Module {
  protected loadControllers(): Function[] {
    return [CreatePaymentIntentionController, ListPaymentsIntentionController];
  }
}

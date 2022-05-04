import {
  HttpRequest,
  HttpResponse,
  RouteConfig,
} from '@/presentation/http/ports';

export abstract class Controller {
  abstract handle(req: HttpRequest): Promise<HttpResponse | void>;

  abstract exception(error: unknown): Error;

  path?: string;

  routeConfigs?: RouteConfig[];
}

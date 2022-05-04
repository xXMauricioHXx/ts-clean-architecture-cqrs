import { HttpRequest, HttpResponse } from '@/presentation/http/ports';

export interface Middleware {
  handle(req: HttpRequest, error?: Error): HttpResponse | Promise<void>;
}

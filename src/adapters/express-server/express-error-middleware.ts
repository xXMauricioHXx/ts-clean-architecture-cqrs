import {
  HttpRequest,
  HttpResponse,
  Middleware,
} from '@/presentation/http/ports';
import logger from '@/logger';
import { HttpError } from '@/presentation/http/exceptions';

export class ErrorHandlerMiddleware implements Middleware {
  handle(req: HttpRequest, error: any): HttpResponse {
    logger.error(`${error.message} - ${error}`);

    if (error instanceof HttpError) {
      const { statusCode, message, code, details } = error;
      return {
        data: {
          code,
          message,
          details,
        },
        status: statusCode || 200,
      };
    }

    if (error?.code === 'ER_DUP_ENTRY') {
      return {
        data: {
          code: 'DUPLICATED_RESOURCE',
          message: 'Duplicated resource',
        },
        status: 409,
      };
    }

    return {
      data: {
        code: 'UNEXPECTED_ERROR',
        message: 'Internal server failure',
      },
      status: 500,
    };
  }
}

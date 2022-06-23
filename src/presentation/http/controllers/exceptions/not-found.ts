import { HttpError } from '@/presentation/http/controllers/exceptions';

export class NotFoundError extends HttpError {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 403, details);
  }
}

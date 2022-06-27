import { HttpError } from '@/presentation/http/exceptions';

export class BadRequest extends HttpError {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 400, details);
  }
}

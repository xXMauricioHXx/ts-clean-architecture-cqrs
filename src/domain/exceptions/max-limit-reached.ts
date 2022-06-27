import { CodedError } from '@/shared/coded-error';

export class MaxLimitReachedError extends CodedError {
  constructor() {
    super('MAX_LIMIT_REACHED', 'Max limit reached');
  }
}

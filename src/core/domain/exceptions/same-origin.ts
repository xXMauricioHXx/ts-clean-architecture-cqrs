import { CodedError } from '@/shared/coded-error';

export class SameOriginError extends CodedError {
  constructor() {
    super('SAME_ORIGIN', "The receiver id and payer id should'nt be same");
  }
}

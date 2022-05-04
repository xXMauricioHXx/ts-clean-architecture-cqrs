import { CodedError } from '@/shared/coded-error';

export class OutSideOfWindowValueError extends CodedError {
  constructor() {
    super(
      'OUT_SIDE_OF_WINDOW_VALUE',
      "Invalid value. After 18 o'clock is only allowed payments below R$ 100"
    );
  }
}

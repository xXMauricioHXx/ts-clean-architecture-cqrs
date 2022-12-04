import { CodedError } from '@/shared/coded-error';

export class UserNotFoundError extends CodedError {
  constructor() {
    super('USER_NOT_FOUND', 'The user id provided not found or not exists');
  }
}

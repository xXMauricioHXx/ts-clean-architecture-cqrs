import { inject, injectable } from 'tsyringe';
import { UserService } from '@/core/ports';
import { UserNotFoundError } from '@/core/exceptions';
import { JsonPlaceHolderIntegration } from '@/infra/services/ports';

@injectable()
export class UserServiceProvider implements UserService {
  constructor(
    @inject('JsonPlaceHolderIntegration')
    private readonly jsonPlaceHolderIntegration: JsonPlaceHolderIntegration
  ) {}

  async checkUserExists(userId: number): Promise<void> {
    const user = await this.jsonPlaceHolderIntegration.getUserById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }
  }
}

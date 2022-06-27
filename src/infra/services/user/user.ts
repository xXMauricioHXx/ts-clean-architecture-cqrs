import { inject, injectable } from 'tsyringe';
import { UserService } from '@/domain/services';
import { UserNotFoundError } from '@/domain/exceptions';
import { JsonPlaceHolderIntegration } from '@/domain/integrations/http';

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

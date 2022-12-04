import { inject, injectable } from 'tsyringe';
import logger from '@/logger';
import { env } from '@/main/env';
import { checkObjectIsEmpty } from '@/shared/helpers';
import { HttpStatus } from '@/infra/integrations/http/enum';
import { HttpClient } from '@/infra/integrations/http/ports';
import { JsonPlaceHolderIntegration } from '@/core/domain/integrations/http';

@injectable()
export class JsonPlaceHolderHttpIntegration
  implements JsonPlaceHolderIntegration
{
  constructor(@inject('HttpClient') private readonly http: HttpClient) {
    this.http.createInstance({
      baseUrl: env.jsonPlaceHolderURL,
    });
  }

  async getUserById(
    id: number
  ): Promise<JsonPlaceHolderIntegration.User | null> {
    try {
      const { data } = await this.http.get(`/users/${id}`);

      const isEmpty = checkObjectIsEmpty(data);

      return isEmpty ? null : data;
    } catch (err) {
      const status = err?.response?.status;

      if (status === HttpStatus.NotFound) {
        return null;
      }

      logger.error(
        `Failed to get user from JSON Place Holder - ${JSON.stringify(err)}`
      );

      throw err;
    }
  }
}

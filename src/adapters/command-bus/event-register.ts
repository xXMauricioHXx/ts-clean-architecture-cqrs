import { Knex } from 'knex';
import { container } from 'tsyringe';
import { Event } from '@/core/application/ports/event';

export class EventRegister {
  static async register(event: Event): Promise<void> {
    const { id } = event.data;

    const database = container.resolve('dbConnection') as Knex;
    await database('events').insert({
      aggregateId: id,
      data: JSON.stringify({
        ...event,
        messageType: event.name,
      }),
      action: event.name,
    });
  }
}

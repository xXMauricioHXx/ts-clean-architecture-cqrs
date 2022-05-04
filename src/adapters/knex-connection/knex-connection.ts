import knex, { Knex } from 'knex';
import { env } from '@/main/env';

export class KnexConnection {
  getConnection(): Knex {
    return knex({
      client: env.dbClient,
      connection: {
        host: env.dbHost,
        user: env.dbUsername,
        password: env.dbPassword,
        database: env.dbDatabase,
        port: env.dbPort,
        typeCast: this.typeCast,
        bigNumberStrings: true,
      },
      pool: {
        min: env.dbPoolMin,
        max: env.dbPoolMax,
      },
      migrations: {
        tableName: 'migrations',
      },
    });
  }

  private typeCast(field: any, next: Function): any {
    switch (field.type) {
      case 'LONGLONG':
        return field.string();
      case 'TINY': {
        return field.string() === '1';
      }
    }

    return next();
  }
}

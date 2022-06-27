import { Knex } from 'knex';

export abstract class Repository<T> {
  protected abstract database: Knex;

  tableName: string;

  protected transactionable(trx?: Knex.Transaction): Knex.QueryBuilder {
    if (trx) {
      return this.table.transacting(trx);
    }
    return this.table;
  }

  protected get table(): Knex.QueryBuilder {
    return this.database(this.tableName);
  }

  get transaction() {
    return this.database.transaction.bind(this.database);
  }

  async findAll(trx?: Knex.Transaction): Promise<T[]> {
    return this.transactionable(trx);
  }

  async findById(id: string, trx?: Knex.Transaction): Promise<T | null> {
    return this.transactionable(trx).where('id', id).first();
  }

  async deleteById(id: string, trx?: Knex.Transaction): Promise<boolean> {
    const result = await this.transactionable(trx).where('id', id).delete();

    return result > 0;
  }

  async updateById(
    id: string,
    data: Record<string, any>,
    trx?: Knex.Transaction
  ): Promise<boolean> {
    const result = await this.transactionable(trx).where('id', id).update(data);

    return result > 0;
  }
}

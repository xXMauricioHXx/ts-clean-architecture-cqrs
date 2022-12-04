/**
 * @param {import('knex')} knex
 */
exports.up = knex =>
  knex.schema.createTable('events', table => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.uuid('aggregateId').notNullable();
    table.json('data').notNullable();
    table.string('action').notNullable();
    table
      .dateTime('createdAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });

/**
 * @param {import('knex')} knex
 */
exports.down = knex => knex.schema.dropTable('events');

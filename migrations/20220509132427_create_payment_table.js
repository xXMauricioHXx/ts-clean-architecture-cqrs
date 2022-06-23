/**
 * @param {import('knex')} knex
 */
exports.up = knex =>
  knex.schema.createTable('payments', table => {
    table.string('id').primary().notNullable();
    table.integer('payerId').unsigned().notNullable();
    table.integer('receiverId').unsigned().notNullable();
    table.integer('value').unsigned().notNullable();
    table.string('description').nullable();
    table
      .dateTime('createdAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('updatedAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });

/**
 * @param {import('knex')} knex
 */
exports.down = knex => knex.schema.dropTable('payments');


exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users_lists'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('lists'),
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username');
      table.string('email');
      table.string('password');
    }),
    knex.schema.createTable('lists', function (table) {
      table.increments('id').primary();
      table.json('list_item');
    }),
    knex.schema.createTable('users_lists', function (table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('list_id').unsigned();
      table.foreign('list_id').references('lists.id')
    })
  ])  
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.table('users', function(table){
    table.string('name');
    table.dropColumn('username');
    table.dropColumn('email');
    table.dropColumn('password');
  }),
  knex.schema.dropTable('lists')]);
};


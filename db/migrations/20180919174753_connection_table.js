exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_lists', function (table) {
    table.increments();
    table.foreign('user_id').references('users');
    table.foreign('list_id').references('lists')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_lists');
};


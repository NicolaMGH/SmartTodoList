exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.table('users_lists', function (table) {
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.integer('list_id').unsigned();
    table.foreign('list_id').references('lists.id')
    })
  ]) 
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.table('users_lists', function (table) {
    table.dropColumn('user_id');
    table.dropColumn('list_id');
    })
  ]) 
};

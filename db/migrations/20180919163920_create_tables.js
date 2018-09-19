
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.dropColumn('name');
      table.string('username');
      table.string('email');
      table.string('password');
    }),
    knex.schema.createTable('lists', function (table) {
      table.increments();
      table.string('JSON');
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

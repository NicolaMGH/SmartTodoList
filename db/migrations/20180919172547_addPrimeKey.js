exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('lists', function(table){
      table.dropColumn('JSON');
      table.json('list_item')
    })
  ])  
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.table('users', function(table){
    table.string('JSON');
    table.dropColumn('list_item')
    })
  ]);
};

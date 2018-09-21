
exports.up = function(knex, Promise) {
  return knex.schema.table('lists', (table) => {
    table.dropColumn('list_item');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('lists', (table) => {
    table.json('list_item');
  })
};

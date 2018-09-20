
exports.up = function(knex, Promise) {
  return knex.schema.createTable('list_items', function (table) {
    table.increments();
    table.integer('list_id').unsigned();
    table.foreign('list_id').references('lists.id');
    table.string('item');
    table.string('category');
  });
};


exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('list_items');
};

exports.up = function(knex, Promise) {
  return;

};

exports.down = function(knex, Promise) {
  return;

};









// exports.up = function(knex, Promise) {
//   return Promise.all([
//     knex.schema.table('lists', function (table) {
//       table.dropColumn('list_item'),
//       knex.schema.createTable('list_items',(table)=>{
//         table.increments();
//         table.integer('list_id').unsigned();
//         table.foreign('list_id').references('lists.id');
//         table.string('item');
//         table.string('category');
//       })
//     })
//   ])
// };

// exports.down = function(knex, Promise) {
//   return Promise.all([knex.schema.table('lists', function (table) {
//     table.json('list_item');
//     }),
//     knex.schema.dropTable('list_items')
//   ])
// };
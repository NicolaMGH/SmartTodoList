exports.up = async function(knex, Promise) {

  const table = await knex.schema.table('lists');
  await table.dropColumn('list_item');
  const list_items = await knex.schema.createTable('list_items');
  await list_items.increments();
  await list_items.integer('list_id').unsigned();
  await list_items.foreign('list_id').references('lists.id');
  await list_items.string('item');
  await list_items.string('category');

};

exports.down = async function(knex, Promise) {
  const table = await knex.schema.table('lists');
  await table.json('list_item');
  await knex.schema.dropTable('list_items');
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
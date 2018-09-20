
exports.up = function(knex, Promise) {
  return knex.schema.table('lists',(table)=>{
    table.string('title');
  });
};


exports.down = async function(knex, Promise) {
  return knex.schema.table('lists',(table)=>{
    table.dropColumn('title');
  });
};

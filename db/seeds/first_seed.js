
exports.seed = async function(knex, Promise) {
  await knex('users_lists').del();
  await knex('users').del();
  await knex('lists').del();
  await knex.raw('ALTER SEQUENCE lists_id_seq RESTART;');
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART;');
  await knex.raw('ALTER SEQUENCE users_lists_id_seq RESTART;');
  await knex('users').insert({username: 'Raymond', email:'raymond@123.com',password:'raymond123'});
  await knex('users').insert({username: 'Nick',email:'nick@456.com',password:'nick456'});
  await knex('users').insert({username: 'Donny',email:'donny@789.com',password:'donny789'});
  const users = await knex('users').select();
  await knex('lists').insert({list_item: '{"title":"boring list","movie":["avangers","batman"]}'});
  await knex('lists').insert({list_item: '{"title":"moring list","cd":["vangers","antman"]}'});
  await knex('lists').insert({list_item: '{"title":"foring list","book":["angers","man"]}'}); 
  const lists = await knex('lists').select();
  await knex('users_lists').insert({list_id: `${lists[1].id}`, user_id:`${users[1].id}`}),
  await knex('users_lists').insert({list_id: `${lists[2].id}`, user_id:`${users[0].id}`}),
  await knex('users_lists').insert({list_id: `${lists[0].id}`, user_id:`${users[2].id}`})
}





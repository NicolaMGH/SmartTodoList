
exports.seed = async function(knex, Promise) {
  await knex('users_lists').del();
  await knex('users').del();
  await knex('lists').del();
  await knex('list_items').del();
  await knex.raw('ALTER SEQUENCE lists_id_seq RESTART;');
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART;');
  await knex.raw('ALTER SEQUENCE users_lists_id_seq RESTART;');
  await knex.raw('ALTER SEQUENCE list_items_id_seq RESTART;');
  await knex('users').insert({username: 'Raymond', email:'raymond@123.com',password:'raymond123'});
  await knex('users').insert({username: 'Nick',email:'nick@456.com',password:'nick456'});
  await knex('users').insert({username: 'Donny',email:'donny@789.com',password:'donny789'});
  const users = await knex('users').select();

  await knex('lists').insert({title: 'boring list'});
  await knex('lists').insert({title: 'moring list'});
  await knex('lists').insert({title: 'foring list'});   
  const lists = await knex('lists').select();

  await knex('users_lists').insert({list_id: `${lists[1].id}`, user_id:`${users[1].id}`});
  await knex('users_lists').insert({list_id: `${lists[2].id}`, user_id:`${users[0].id}`});
  await knex('users_lists').insert({list_id: `${lists[0].id}`, user_id:`${users[0].id}`});

  await knex('list_items').insert({list_id: `${lists[0].id}`,item:"avengers",category:"watch"});
  await knex('list_items').insert({list_id: `${lists[1].id}`,item:"batmans",category:"watch"});
  await knex('list_items').insert({list_id: `${lists[2].id}`,item:"birdman",category:"watch"});
  await knex('list_items').insert({list_id: `${lists[0].id}`,item:"burgers",category:"eat"});
  await knex('list_items').insert({list_id: `${lists[1].id}`,item:"apple",category:"eat"});
  await knex('list_items').insert({list_id: `${lists[2].id}`,item:"lunch",category:"eat"});
  await knex('list_items').insert({list_id: `${lists[0].id}`,item:"station",category:"play"});
  await knex('list_items').insert({list_id: `${lists[1].id}`,item:"football",category:"play"});
  await knex('list_items').insert({list_id: `${lists[2].id}`,item:"cat",category:"play"});
  await knex('list_items').insert({list_id: `${lists[0].id}`,item:"toys",category:"buy"});
  await knex('list_items').insert({list_id: `${lists[1].id}`,item:"house",category:"buy"});
  await knex('list_items').insert({list_id: `${lists[2].id}`,item:"laptop",category:"buy"});
}



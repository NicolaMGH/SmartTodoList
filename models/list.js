const knex = require('knex')

const findListsForUser = user_id => {
  return
    knex
      .select('list_items.item', 'list_items.categories', 'lists.title')
      .from('list_items')
      .join('lists', 'lists.id', '=', 'list_items.list_id')
      .join('users_lists', 'users_list.list_id', '=', 'lists.id')
      .where('users_lists.user_id', user_id)
      .then( items => {
        console.log(items);

        items.reduce( (item, output) => {

        }, {})
      })
}

const findListItems = list_id
module.exports = user_id => {
  return new Promise( resolve => {
    // find the lists the user owns
    // for each list find the items
  }
}
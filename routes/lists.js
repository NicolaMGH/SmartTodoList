// Routes to retrieve the lists from psql using knex of req.session.user

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("list_item")
      .from("lists")
      .where("id", 1)
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/user_lists", async (req, res) => {
    knex
      .select('lists.id', 'list_items.item', 'list_items.category', 'lists.title')
      .from('list_items')
      .join('lists', 'lists.id', '=', 'list_items.list_id')
      .join('users_lists', 'users_lists.list_id', '=', 'lists.id')
      .where('users_lists.user_id', req.session.id)
      .then(items => {
        const lists = {};
        items.forEach((item) => {
          if (!lists[item.id]) {
            lists[item.id] = {title: item.title};
            lists[item.id][item.category] = [item.item];
          } else if (!lists[item.id][item.category]) {
            lists[item.id][item.category] = [item.item];
          } else {
            lists[item.id][item.category].push(item.item);
          }
        })
        console.log('im done', lists);
      });
  });


  router.post('/', (req, res) => {
    const todo = req.body
    console.log(todo);
    const input = Object.keys(todo);

    knex('lists')
    .insert()
  })

  router.get("/auth", (req, res) => {
    const UN = req.body.username;
    const PW = req.body.password;
  })

  return router;
}

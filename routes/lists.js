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

  router.get("/user_lists", (req, res) => {
    knex
      .select('item', 'category')
      .from('list_items')
      .join('lists', 'list_id', 'lists.id')
      .join('users_lists', 'lists.id', 'users_lists.list_id')
      .join('users', 'users_lists.user_id', 'users.id')
      .where('users.id', req.session.id)
      .andWhere('lists.id', 1)
      .then((results) => {
        console.log(results);
        res.send(results);
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

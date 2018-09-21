// Routes to retrieve the lists from psql using knex of req.session.user

const express = require('express');
const router = express.Router();
const massage = require('../helpers/data-massage');

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("item")
      .from("list_items")
      .then((results) => {
        res.json(results);
      });
  });

  // GET todos lists based on session
  router.get("/user_lists", async (req, res) => {
    knex
      .select('lists.id', 'list_items.item', 'list_items.category', 'lists.title')
      .from('lists')
      .leftJoin('list_items', 'lists.id', '=', 'list_items.list_id')
      .join('users_lists', 'users_lists.list_id', '=', 'lists.id')
      .where('users_lists.user_id', req.session.id)
      .then(items => {
        console.log(items);

        res.send(massage.dataToObj(items));
      });
  });


  router.post('/', async (req, res) => {
    const title = req.body.title;
    const user_id = req.session.id;

    if (title !== null) {
      const list_id = await knex('lists').insert({ title }).returning('id');
      console.log(list_id);
      await knex('users_lists').insert({ user_id, list_id: list_id[0] });
    }
  })

  router.get("/auth", (req, res) => {
    const UN = req.body.username;
    const PW = req.body.password;
  })

  return router;
}

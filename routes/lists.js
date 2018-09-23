// Routes to retrieve the lists from psql using knex of req.session.user

const express = require('express');
const router = express.Router();
const massage = require('../helpers/data-massage');
const catOf = require('../helpers/paralleldot_API');

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
  router.get("/user_lists", async(req, res) => {
    if (req.session.id) {
      knex
        .select('lists.id', 'list_items.item', 'list_items.category', 'lists.title')
        .from('lists')
        .leftJoin('list_items', 'lists.id', '=', 'list_items.list_id')
        .join('users_lists', 'users_lists.list_id', '=', 'lists.id')
        .where('users_lists.user_id', req.session.id)
        .then(items => {
          console.log(massage.dataToObj(items));
          res.send(massage.dataToObj(items));
        });
    } else {
      res.send();
    }
  });

  router.put('/', async(req, res) => {

    const inserted = await knex('list_items')
      .where({ list_id: req.body.listId })
      .andWhere({ item: req.body.listItem })
      .update({ category: req.body.catName.toLowerCase() })
      .returning('*')

    console.log(inserted);
    await res.status(200).send();

  })

  router.post('/', async(req, res) => {
    const title = req.body.title;
    const user_id = req.session.id;

    if (title !== null) {
      const list_id = await knex('lists').insert({ title }).returning('id');
      console.log(list_id);
      await knex('users_lists').insert({ user_id, list_id: list_id[0] })
      await res.send(list_id);
    }
  })

  router.post('/item', async(req, res) => {
    const category = await catOf(req.body.todo);
    await knex('list_items')
      .insert({ list_id: req.body.id, item: req.body.todo, category })
      .returning('*')
    await res.send(category);
  })

  router.delete('/item', async(req, res) => {
    const deleted = await knex('list_items')
      .where({ item: req.body.deletedItem })
      .andWhere({ list_id: req.body.listId })
      .del()
      .returning('*')

    console.log(deleted);

    await res.status(200).send();

  })

  router.delete('/', async(req, res) => {
    await knex('users_lists')
      .where({ list_id: req.body.listId })
      .del()
    await knex('list_items')
      .where({ list_id: req.body.listId })
      .del()
    await knex('lists')
      .where({ id: req.body.listId })
      .del()
    await res.send('ok');
  })


  return router;
}

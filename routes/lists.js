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
      .select("list_item")
      .from("lists")
      .join("users_lists", "list_id", "lists.id")
      .where("user_id", '1')
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/auth", (req, res) => {
    const UN = req.body.username;
    const PW = req.body.password;
  })

  return router;
}

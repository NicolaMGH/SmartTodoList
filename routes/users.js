"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.post('/', async (req, res) => {
    const { username } = req.body;
    const { email } = req.body;
    const { password } = req.body;
      try {
        const id = await knex('users')
          .insert({ username, email, password })
          .returning('id');

        req.session.id = id[0];
        res.send(true);
      } catch (err) {
        res.send(false);
      }

  })

  router.get("/auth", (req, res) => {
    const UN = req.body.username;
    const PW = req.body.password;
  })

  return router;
}

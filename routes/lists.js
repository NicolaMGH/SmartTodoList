// Routes to retrieve the lists from psql using knex of req.session.user

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("JSON")
      .from("list")
      .where("id", req.session.id)
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

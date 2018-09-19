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

  router.get("/auth", (req, res) => {
    const UN = req.body.username;
    const PW = req.body.password;
  })

  return router;
}

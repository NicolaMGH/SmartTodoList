"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const cookieSess  = require('cookie-session');
const massage = require('./helpers/data-massage')

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const listsRoutes = require("./routes/lists");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSess({
  name: 'session',
  keys: ['mysecretkey'],
}));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/lists", listsRoutes(knex));

// Home page
app.get("/", (req, res) => {
  if (req.session.id) {
    res.render("index");
  } else {
    res.render("login");
  }
});

app.put("/login", async (req, res) => {
  const user = req.body.username;
  console.log(req.body);

  try {
    const id = await knex('users')
      .select('id')
      .where('username', user);
    if (id[0].id) {
      req.session.id = id[0].id;
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.send(false);
  }
})

app.get('/analytics', (req, res) => {
  res.render('analytics');
})

app.put('/share', async (req, res) => {
  const listid = req.body.listid;
  const user = req.body.username;
  try {
    let userid = await knex('users')
      .select('id')
      .where('username', user);

    userid = userid[0].id;

    await knex('users_lists')
      .insert({user_id: userid, list_id: listid})
      .returning('*');

    await res.send(true);
  } catch (err) {
    res.send(false);
  }
})


app.put('/analytics', async (req, res) => {
  let data = await knex
    .select('lists.id', 'list_items.item', 'list_items.category', 'lists.title')
    .from('lists')
    .leftJoin('list_items', 'lists.id', '=', 'list_items.list_id')
    .join('users_lists', 'users_lists.list_id', '=', 'lists.id')
    .where('users_lists.user_id', req.session.id)

  data = await massage.countItems(data);
  await res.send(data);
})

app.post('/logout', (req, res) => {
  req.session = null;
  res.send('ok');
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

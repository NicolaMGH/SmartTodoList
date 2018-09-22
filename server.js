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

app.get("/test", (req, res) => {
  req.session.id = 1;
  console.log(req.body, req.session.id);
  res.send("ok");
})

app.get('/analytics', (req, res) => {
  res.render('analytics');
})

app.get('/login', (req, res) => {
  res.render('login');
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

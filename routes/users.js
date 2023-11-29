/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const { getUserById } = require('../db/queries/users');

router.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

router.get('/', (req, res) => {
  res.render('users');
});

router.get('/:id', (req, res) => {
  getUserById(req.session.user_id)
  .then((user) => {
    const templateVars = { user };
    res.render('profile', templateVars);
  })
});

module.exports = router;

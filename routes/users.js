/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const { getUserById, editUser } = require('../db/queries/users');

router.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

router.get('/', (req, res) => {
  res.render('users');
});

// GET User Profile edit page
router.get('/:id', (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.redirect("/");
  }

  getUserById(userId)
  .then((user) => {
    const templateVars = { user };
    res.render('profile', templateVars);
  })
});

// POST to update profile information in database
router.post('/:id', (req, res) => {
  const { name, email, password } = req.body;
  const id = req.session.user_id;

  if (!id) {
    return res.redirect("/");
  }

  editUser({ name, email, password, id })
    .then((data) => {
      console.log(data);
      res.redirect("/");
    })
    .catch((err) => console.log(err.message));
});

module.exports = router;

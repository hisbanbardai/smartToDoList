const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const { addUser, getUserByEmail } = require("../db/queries/users");

router.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

router.get("/", (req, res) => {
  const userId = req.session.user_id;

  const templateVars = {
    user: userId
  };

  if(userId) {
    return res.redirect("/");
  }

  res.render("sign-up", templateVars);
});

router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // Check if email exists in database
  getUserByEmail(email)
  .then((data) => {
    if (data) {
      return res.send({ error: "user with that email already exists" });
    }

    // If email does not exist, add user to database
    addUser(name, email, password)
    .then((data) => {
      req.session.user_id = data.id;
      res.redirect("/");
    })
    .catch((err) => console.log(err.message));
  });

});

module.exports = router;

const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const { getUserByEmail } = require("../db/queries/users");

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

  res.render("login", templateVars);
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    getUserByEmail(email)
    .then((user) => {
      if (!user) {
        return res.send({ error: "no user with that email" });
      }

      if (user.password !== password) {
        return res.send({ error: "incorrect password" });
      }

      req.session.user_id = user.id;
      res.redirect("/");
    })
    .catch((err) => console.log(err.message));
  } else {
    return res.status(400).send("Email and password are required");
  }
});

module.exports = router;

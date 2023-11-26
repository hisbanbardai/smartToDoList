const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const { addUser } = require("../db/queries/users");

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
  const user = { name, email, password };

  addUser(user)
  .then((data) => {
    req.session.user_id = data.id;
    res.redirect("/");
  })
  .catch((err) => console.log(err.message));

});

module.exports = router;

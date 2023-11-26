const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");

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
  //using getUserByEmmail() ?
  const { email, password } = req.body;
  if (email && password) {
    req.session.user_id = '1';
    res.redirect("/");
  } else {
    return res.status(400).send("Email and password are required");
  }
});

module.exports = router;

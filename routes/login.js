const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

router.get("/", (req, res) => {
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    req.session.user_id = '1';
    res.redirect("/");
  } else {
    return res.status(400).send("Email and password are required");
  }
});

module.exports = router;

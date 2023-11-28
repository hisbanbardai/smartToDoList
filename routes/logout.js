const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");

router.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

// Using GET route as navbar uses links for buttons
router.get("/", (req, res) => {
  req.session = null;
  res.redirect("/login");
})

module.exports = router;

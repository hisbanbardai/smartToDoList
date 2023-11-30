const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const { getCategories } = require("../db/queries/categories");

router.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

router.get("/", (req, res) => {
  getCategories()
    .then((categories) => res.json({ categories }))
    .catch(error => error.message);
  // res.render("users");
});

module.exports = router;

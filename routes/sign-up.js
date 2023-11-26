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

  res.render("sign-up", templateVars);  
});

router.post("/", (req, res) => {

});

module.exports = router;

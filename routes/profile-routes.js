var router = require("express").Router();

var authCheck = function(req, res, next) {
  if(!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/", authCheck, function(req, res) {
  // res.send("Logged in as " + req.user.username);
  res.render("profile", {user: req.user});
});

module.exports = router;

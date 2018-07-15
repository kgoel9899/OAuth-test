var express = require("express");
var authRoutes = require("./routes/auth-routes");
var profileRoutes = require("./routes/profile-routes");
var passportSetup = require("./config/passport-setup");
var mongoose = require("mongoose");
var keys = require("./config/keys");
var cookieSession = require("cookie-session");
var passport = require("passport");
var PORT = process.env.PORT || 3000;

var app = express();

app.set("view engine", "ejs");

app.use(cookieSession({
  maxAge: 1000000,
  keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, function() {
  console.log("Connected to database");
}, {useNewUrlParser: true});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.get("/", function(req, res){
  res.render("home", {user: req.user});
});


app.listen(PORT, function(req, res){
  console.log("Listening to port 3000, Server started");
});

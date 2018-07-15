var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var FacebookStrategy = require("passport-facebook");
var GitHubStrategy = require("passport-github");
var TwitterStrategy = require("passport-twitter");
var keys = require("./keys");
var User = require("../models/user-model");

passport.serializeUser(function(user, done) {
  done(null, user.id); //pass the id to the next stage
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    done(null, user); //pass the user to next step
  })
});


//google
passport.use(new GoogleStrategy({
  callbackURL: "/auth/google/redirect",
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
}, function(accessToken, refreshToken, profile, done) {
  User.findOne({gofaId: profile.id}).then(function(currentUser) {
    if(currentUser) {
      console.log("User already exists:" + currentUser);
      done(null, currentUser); //this will go to the serialize function for further steps
    } else {
      new User({
        username: profile.displayName,
        gofaId: profile.id,
        thumbnail: profile._json.image.url
      }).save().then(function(newUser) {
        console.log("Created");
        console.log(newUser);
        done(null, newUser); //this will go to the serialize function for further steps
      });
    }
  });
  // console.log(profile);
}
));


//facebook
passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "/auth/facebook/redirect",
    profileFields   : ["id", "displayName", "name", "gender" , "email", "photos"],
    enableProof: true
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({gofaId: profile.id}).then(function(currentUser) {
      if(currentUser) {
        console.log("User already exists:" + currentUser);
        done(null, currentUser); //this will go to the serialize function for further steps
      } else {
        new User({
          username: profile.name.givenName + ' ' + profile.name.familyName,
          gofaId: profile.id,
          thumbnail: profile.photos[0].value
        }).save().then(function(newUser) {
          console.log("Created");
          console.log(newUser);
          done(null, newUser); ////this will go to the serialize function for further steps
        });
      }
    });
  }
));


//github
passport.use(new GitHubStrategy({
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL: "/auth/github/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({gofaId: profile.id}).then(function(currentUser) {
      if(currentUser) {
        console.log("User already exists:" + currentUser);
        done(null, currentUser); //this will go to the serialize function for further steps
      } else {
        new User({
          username: profile.displayName,
          gofaId: profile.id,
          thumbnail: profile.photos[0].value
        }).save().then(function(newUser) {
          console.log("Created");
          console.log(newUser);
          done(null, newUser); //this will go to the serialize function for further steps
        });
      }
    });
    // console.log(profile);
  }
));


//twitter
passport.use(new TwitterStrategy({
    consumerKey: keys.twitter.consumerKey,
    consumerSecret: keys.twitter.consumerSecret,
    callbackURL: "/auth/twitter/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({gofaId: profile.id}).then(function(currentUser) {
      if(currentUser) {
        console.log("User already exists:" + currentUser);
        done(null, currentUser); //this will go to the serialize function for further steps
      } else {
        new User({
          username: profile.displayName,
          gofaId: profile.id,
          thumbnail: profile.photos[0].value
        }).save().then(function(newUser) {
          console.log("Created");
          console.log(newUser);
          done(null, newUser); //this will go to the serialize function for further steps
        });
      }
    });
    // console.log(profile);
  }
));

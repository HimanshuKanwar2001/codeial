const passport = require("passport");
const User = require("../models/user");

const LocalStrategy = require("passport-local").Strategy;

// authetication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      //find a user and establish the identity
      const user = await User.findOne({ email: email });
      try {
        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, flase);
        }
        return done(null, user);
      } catch (err) {
        console.log("Error in finding user --> Passport", err);
        return done(err);
      }
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, uder.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log("Error in finding user --> Passport", err);
    return done(err);
  }
});

module.exports = passport;

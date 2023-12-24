const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");


//tell passport to use new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "195046875966-ndam5m8jjebr0i4teikli837rj130rk0.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        //find a user
        const user = await User.findOne({
          email: profile.emails[0].value,
        }).exec();
        console.log(user);

        if (user) {
            //if found ,set this user as req.user
          return done(null, user);
        } else {
            //if not found,create the user and set it as req.user(sign in the user)
          const user = User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });
          return done(null,user);
        }
      } catch (err) {
        console.error("Error:", err);
        return res.status(500).send("Internal Server Error");
      }
    }
  )
);

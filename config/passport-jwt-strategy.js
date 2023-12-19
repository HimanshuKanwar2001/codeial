const passport = require("passport");
const JTWStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
  secretOrKey: "codeial",
};

passport.use(
  new JTWStrategy(opts, async function (jwtPayLoad, done) {
    try {
      const user = await User.findById(jwtPayLoad._id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Internal Server Error");
    }
  })
);


module.exports=passport;
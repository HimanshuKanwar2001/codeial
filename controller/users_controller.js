const User = require("../models/user");

module.exports.profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.render("user_profiles", {
      title: "Home",
      profile_user: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports.update = async function (req, res) {
  try {
    if (req.user.id == req.params.id) {
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      return res.redirect("back");
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

//render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

//render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial | Sign Up",
  });
};

//get the sign up data
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    // console.log("Is User Present ",user);

    if (!user) {
      const newUser = await User.create(req.body);
      return res.redirect("/users/sign-in");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).send("Internal Server Error");
  }
};

//sign in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    // Redirect or send a response indicating successful logout
    res.redirect("/"); // You can replace this with your desired redirect or response
  });
};

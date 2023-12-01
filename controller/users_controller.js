const User=require('../models/user');


module.exports.profile = function (req, res) {
   return res.render("user_profiles", {
     title: "Home",
   });

};

//render the sign up page
module.exports.signUp=function(req,res){
  return res.render('user_sign_up',{
    title:"Codeial | Sign Up"
  })
}

//render the sign in page
module.exports.signIn=function(req,res){
  return res.render('user_sign_in',{
    title:"Codeial | Sign Up"
  })
}

//get the sign up data
module.exports.create= async function (req,res){
  if(req.body.password!= req.body.confirm_password){
    return res.redirect('back');
  }

  try {
  const user = await User.findOne({ email: req.body.email });

  console.log("Is User Present ",user);

  if (!user) {
    const newUser = await User.create(req.body);
    return res.redirect('/users/sign-in');
  } else {
    return res.redirect('back');
  }
} catch (err) {
  console.error('Error:', err.message);
  return res.status(500).send('Internal Server Error');
}
}

//sign in and create a session for the user
module.exports.createSession=function(req,res){
  //TODO later
}
const User=require('../models/user');


module.exports.profile = async function (req, res) {
  try{

    if (req.cookies.user_id) {
      const user = await User.findById(req.cookies.user_id);
      if(user){
        return res.render('user_profiles',{
          title:"User Profile",
          user:user,
        })
      }
    } else {
      return res.redirect("/users/sign-in");
    }
    //  return res.render("user_profiles", {
    //    title: "Home",
    //  });

  }catch(err){
    console.err("Error :",err.message);
    return res.status(500).send("Internal Server Error");
  }
  

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
module.exports.createSession=async function(req,res){

  try{
    //steps to authenticate
    //find the user
    const user = await User.findOne({ email: req.body.email });
    //handle user found
    if(user){
      //handle password which doesn't match
      if(user.password != req.body.password){
          return res.redirect('back');
      }


      //handle session creation
      res.cookie('user_id',user.id);
      return res.redirect('/users/profile');



    }else{
      //handle user not found
      return res.redirect('back');
    }
  
  }catch(err){
    
      console.error("Error:", err.message);
      return res.status(500).send("Internal Server Error");

  }
}

module.exports.signOut=function(req,res){
  
    res.clearCookie("user_id");
    return res.redirect("/users/sign-in");
  
}
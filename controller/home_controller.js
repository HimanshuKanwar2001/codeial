const Post = require("../models/post");

module.exports.home = async function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id',25);
//   try {
//     const posts = await Post.find({});
//     return res.render("home", {
//       title: "Codeial | Home",
//       posts: posts,
//     });
//   } catch (err) {
//     console.err("Error :", err.message);
//     return res.status(500).send("Internal Server Error");
//   }
  //populate the user of each post
  try {
    const posts = await Post.find({}).populate("user").populate({
      path:'comments',
      populate:{
        path:'user'
      }
    }).exec();
    
    // console.log(posts);
    res.render("home", {
      title: "Codeial | Home",
      posts: posts,
    });

  } catch (err) {
    // Handle error appropriately
    console.error(err);
    // Return an appropriate response to the client
    return res.status(500).send("Internal Server Error");
  }
};

//module.exports.actionName=function(req,res){}

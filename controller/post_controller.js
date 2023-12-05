const Post=require('../models/post')


module.exports.create=async function(req,res){
    try{
            const user = await Post.create({
              content: req.body.content,
              user: req.user._id,
            });
            console.log(user);
            return res.redirect('back');
    }catch(err){
        console.err("Error : ",err.message)
        return res.status(500).send("Internal Server Error");
    }

   
}